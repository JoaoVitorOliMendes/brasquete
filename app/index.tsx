import { View, Text, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Redirect, useRouter } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/api/supabase';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/api/authApi';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { upsertExpoToken } from '@/api/profileApi';
import { Profiles } from '@/model/models';
import * as Location from 'expo-location'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

async function sendPushNotification(expoPushToken: string) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('Permission not granted to get push token for push notification!');
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError('Project ID not found');
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            ;
            return pushTokenString;
        } catch (e: unknown) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('Must use physical device for push notifications');
    }
}

const Index = () => {
    const { data: user, isLoading } = useQuery(['user'], fetchUser)
    const useUpsertExpoToken = useMutation(upsertExpoToken)
    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );

    const router = useRouter()

    useEffect(() => {
        // if (!isLoading && user)
        //     router.replace("/(drawer)/event/");

        Location.getBackgroundPermissionsAsync().then((val) => {
            if (val.status !== 'granted')
                Location.requestBackgroundPermissionsAsync()
        })
        Location.getForegroundPermissionsAsync().then((val) => {
            if (val.status !== 'granted')
                Location.requestForegroundPermissionsAsync()
        })

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            ;
        });

        supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session) {
                await registerForPushNotificationsAsync()
                    .then(token => {
                        setExpoPushToken(token ?? '')

                        if (token && session.user) {
                            useUpsertExpoToken.mutateAsync({ id: session.user.id, expo_push_token: token } as Profiles)
                        }
                    })
                    .catch((error: any) => setExpoPushToken(`${error}`));
                router.replace("/(drawer)/event/");
            } else {
                router.replace("/splash");
            }
        })
        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
                Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])
}

export default Index