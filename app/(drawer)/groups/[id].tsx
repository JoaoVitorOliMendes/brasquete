import { View, Text, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import CustomTitle from '@/components/customTitle';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import NavHeader from '@/components/navHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapView, Marker, PROVIDER_GOOGLE } from '@/components/map/mymap'
import { Group } from '@/model/api';
import { Region } from 'react-native-maps';
import Stars from '@/components/stars';

const GroupsDetails = () => {
    const group: Group = {
        id: 1,
        isPublic: true,
        level: 3,
        location: {
            city: 'Belo Horizonte',
            country: 'BR',
            latitude: -19.93634456787944,
            longitude: -43.96623943001032,
            neighborhood: 'Grajaú',
            state: 'Minas Gerais',
            street: 'Rua Santa Cruz',
            streetNumber: '560'
        },
        name: 'Grupo 1',
        groupMembers: [
            {
                id: 0,
                confirmed: "string",
                position: "string",
                userId: 0,
                user: {
                    id: 0,
                    name: "string"
                }
            },
            {
                id: 0,
                confirmed: "string",
                position: "string",
                userId: 0,
                user: {
                    id: 0,
                    name: "string"
                }
            },
            {
                id: 0,
                confirmed: "string",
                position: "string",
                userId: 0,
                user: {
                    id: 0,
                    name: "string"
                }
            },
            {
                id: 0,
                confirmed: "string",
                position: "string",
                userId: 0,
                user: {
                    id: 0,
                    name: "string"
                }
            }
        ],
    }

    const region: Region = {
        latitude: group.location?.latitude || 24.8607,
        longitude: group.location?.longitude || 67.0011,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    }

    const mapRef = React.useRef<MapView>(null)

    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    if (!group) {
        router.back()
    }

    return (
        <SafeAreaView className='h-full'>
            {router.canGoBack() && <NavHeader iconProps={{ color: 'white', icon: 'arrow-back', onPress: () => router.back() }} className={'bg-secondary py-2'} />}
            <ScrollView className='p-4'>
                <View className='w-full h-[50vh]'>
                    <MapView
                        ref={mapRef}
                        style={{ width: '100%', height: '100%' }}
                        provider={PROVIDER_GOOGLE}
                        // onLayout={(e) => {
                        //     // console.log('onLayout', e)
                        //     mapRef.current?.animateToRegion(region, 10)
                        // }}
                        initialRegion={region}
                    >
                        <Marker
                            coordinate={{
                                latitude: group.location?.latitude || 0,
                                longitude: group.location?.longitude || 0
                            }}
                        />
                    </MapView>
                </View>
                <View className='flex flex-row flex-wrap'>
                    <CustomTitle title={group.name || ''} sizeClass='text-4xl' className='mb-4 basis-full' />
                    <Stars textClassName='text-2xl' label='Nível: ' rating={group.level} size={32} className='mb-4' disabled />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default GroupsDetails