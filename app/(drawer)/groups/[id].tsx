import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import CustomTitle from '@/components/customTitle';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import NavHeader from '@/components/navHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapView, Marker, PROVIDER_GOOGLE } from '@/components/map/mymap'

const GroupsDetails = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    useEffect(() => {
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('Permission to access location was denied')
                return
            }

            let location = await Location.getCurrentPositionAsync()
            setLocation(location)
        }
        getCurrentLocation()
    }, []);

    const group: Group = {
        id: Number.parseInt(id),
        name: 'Grupo 1',
        level: 'Intermediário',
        address: 'Rua Reinado do Cavalo Marinho',
        dateTime: new Date()
    }

    if (!group) {
        router.back()
    }

    return (
        <SafeAreaView className='h-full'>
            {router.canGoBack() && <NavHeader iconProps={{ color: 'white', icon: 'arrow-back', onPress: () => router.back() }} className={'bg-secondary py-2'} />}
            <View className='p-4 h-full'>
                <View className='w-100 h-1/2'>
                    {
                        location &&
                        <MapView
                            style={{ width: '100%', height: '100%' }}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                longitudeDelta: 0.005,
                                latitudeDelta: 0.005
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude
                                }}
                            />
                        </MapView>
                    }
                </View>
                <CustomTitle title={group.name || ''} sizeClass='text-4xl' />
                <Text>Endereço: {group.address}</Text>
                <Text>Nível: {group.level}</Text>
                <Text>Data: {group.dateTime?.toLocaleString()}</Text>
            </View>
        </SafeAreaView>
    )
}

export default GroupsDetails