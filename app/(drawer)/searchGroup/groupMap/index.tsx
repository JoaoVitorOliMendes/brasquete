import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { getAvailableGroups } from '@/api/groupsApi';
import { fetchUser } from '@/api/authApi';
import { envVars } from '@/constants';
import * as Location from 'expo-location'

const GroupMap = () => {
    const [initialLocation, setInitialLocation] = useState<Region | null>(null)
    const { data: user, isLoading } = useQuery(['user'], fetchUser)

    const { data: groupsData, refetch } = useQuery(['groups', 'available'], () => getAvailableGroups(user!.id), {
        enabled: !!user
    })

    useRefreshOnFocus(refetch)
    const router = useRouter();

    useEffect(() => {
        Location.getCurrentPositionAsync().then((val) => {
            setInitialLocation({
                latitude: val.coords.latitude,
                longitude: val.coords.longitude,
                longitudeDelta: 0.005,
                latitudeDelta: 0.005
            })
        })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {
                !!initialLocation &&
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    googleMapsApiKey={'AIzaSyCmCQA1Xfjk9mt-FQZ-Zqn9c6VLirzpe70'}
                    loadingEnabled={true}
                    region={initialLocation}
                >
                    {
                        groupsData?.map((group) => {
                            if (group.location) {
                                return (
                                    <Marker
                                        key={group.id}
                                        coordinate={{
                                            latitude: group.location?.latitude,
                                            longitude: group.location?.longitude,
                                        }}
                                        title={group.name}
                                    >
                                        <Callout onPress={() => router.push(`/groups/${group.id}`)}>
                                            <View style={{ minWidth: 100 }}>
                                                <Text>{group.name}</Text>
                                                <Text style={{ color: 'blue', marginTop: 5 }}>Ver grupo</Text>
                                            </View>
                                        </Callout>
                                    </Marker>
                                )
                            }
                        })
                    }
                </MapView>
            }
        </View>
    );
};

export default GroupMap;