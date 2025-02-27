import { View, Text, Platform, ScrollView, Image } from 'react-native'
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
import { colors, images } from '@/constants';
import CustomPressIcon from '@/components/buttons/customPressIcon';
import ExpandableIcon from '@/components/buttons/expandableIcon';

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
            <NavHeader title={group.name} iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo('/groups') }} className={'bg-secondary'} />
            <ScrollView overScrollMode='never' persistentScrollbar showsVerticalScrollIndicator className='flex-1'>
                <SafeAreaView className='p-4'>
                    <View className='w-full h-[33vh]'>
                        <Image source={images.staticMapExample} className='w-full h-full object-cover' />
                    </View>
                    <View className='flex flex-row flex-wrap'>
                        <Text className='my-4 basis-full'>
                            {group.description}
                        </Text>
                        <Stars textClassName='text-2xl' label='Nível: ' rating={group.level} size={32} className='my-4' disabled />
                    </View>
                </SafeAreaView >
                {groupMemberListMemo}
            </ScrollView>
            <ExpandableIcon menuItems={[
                {
                    icon: 'pencil',
                    label: 'Editar Grupo',
                    onPress: () => {
                        router.push('/groups/editGroup')
                    }
                }
            ]} />
        </>
    )
}

export default GroupsDetails