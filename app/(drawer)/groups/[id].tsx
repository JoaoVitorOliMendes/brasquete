import { View, Text, Platform, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import CustomTitle from '@/components/customTitle';
import NavHeader from '@/components/navHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Group } from '@/model/api';
import Stars from '@/components/stars';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import type { Region } from 'react-native-maps'
import LoadingIndicator from '@/components/loadingIndicator';
import GroupMemberList from '@/components/groupMemberList';
import { colors } from '@/constants';

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
                confirmed: 'confirmed',
                position: 'Ala',
                userId: 0,
                user: {
                    id: 0,
                    name: 'João'
                }
            },
            {
                id: 1,
                confirmed: 'confirmed',
                position: 'Pivo',
                userId: 0,
                user: {
                    id: 1,
                    name: 'Jamir'
                }
            },
            {
                id: 2,
                confirmed: 'absent',
                position: 'Armador',
                userId: 0,
                user: {
                    id: 2,
                    name: 'Diego'
                }
            },
            {
                id: 3,
                confirmed: 'deciding',
                position: 'Ala',
                userId: 0,
                user: {
                    id: 3,
                    name: 'Alberto'
                }
            }
        ],
    }

    // Key to force re-render of MapView
    // Props to WoodyLinwc/Random-Generator-React-Native
    const [mapKey, setMapKey] = useState<number | null>(null)
    const [mapReady, setMapReady] = useState<boolean>(false)
    const [region, setRegion] = useState<Region | null>({
        latitude: group.location?.latitude || 0,
        longitude: group.location?.longitude || 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    })

    const mapRef = React.useRef<MapView>(null)
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    const groupMemberListMemo = useMemo(() => {
        return <GroupMemberList members={group.groupMembers} />
    }, [group])

    if (!group) {
        router.back()
    }

    return (
        <>
            {router.canGoBack() && <NavHeader iconProps={{ color: 'white', icon: 'arrow-back', onPress: () => router.back() }} className={'bg-secondary py-2'} />}
            <SafeAreaView className='p-4'>
                <View className='w-full h-[33vh]'>
                    <LoadingIndicator className={`bg-white absolute z-10 ${mapReady && 'hidden'}`} />
                    {
                        !!region &&
                        <MapView
                            onRegionChange={() => {
                                // What a shit component google
                                console.log('useEffect', Date.now(), mapKey, mapRef.current?.state.isReady)
                                if (!mapRef.current?.state.isReady)
                                    setMapKey(Date.now())
                                else
                                    setMapReady(true)
                            }}
                            key={mapKey}
                            ref={mapRef}
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            region={region}
                            googleMapsApiKey={process.env.EXPO_PUBLIC_MAPS_API_KEY_DEV}
                        >
                            <Marker
                                coordinate={{
                                    latitude: region.latitude,
                                    longitude: region.longitude
                                }}
                            />
                        </MapView>
                    }
                </View>
                <View className='flex flex-row flex-wrap'>
                    <CustomTitle title={group.name || ''} sizeClass='text-4xl' className='mb-4 basis-full' />
                    <Stars textClassName='text-2xl' label='Nível: ' rating={group.level} size={32} className='mb-4' disabled />
                </View>
            </SafeAreaView>
            <ScrollView endFillColor={colors.secondary} overScrollMode='never' persistentScrollbar showsVerticalScrollIndicator className='flex-1'>
                {groupMemberListMemo}
            </ScrollView>
        </>
    )
}

export default GroupsDetails