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
import CustomPressIcon from '@/components/customPressIcon';

const GroupsDetails = () => {
    const group: Group = {
        id: 1,
        description: 'Grupo do cotemig, faça parte e tals asdjahsd asdihaskjd asdjkhasdkjh askjdhaa aksja ksj askajks ',
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
            <CustomPressIcon icon='edit' size={36} onPress={() => router.push({ pathname: '/groups/editGroup', params: { id } })} className='absolute bottom-12 right-4 w-20 h-20 bg-emerald-700' />
            <SafeAreaView className='p-4'>
                <View className='w-full h-[33vh]'>
                    {
                        !!region &&
                        <MapView
                            ref={mapRef}
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            region={region}
                            loadingEnabled={true}
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
                    <CustomTitle title={group.name || ''} sizeClass='text-4xl' className='mb-2 basis-full' />
                    <Text className='mb-4 basis-full'>
                        {group.description}
                    </Text>
                    <Stars textClassName='text-2xl' label='Nível: ' rating={group.level} size={32} className='my-4' disabled />
                </View>
            </SafeAreaView>
            {groupMemberListMemo}
        </>
    )
}

export default GroupsDetails