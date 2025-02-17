import { View, Text, Platform, ScrollView, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import CustomTitle from '@/components/customTitle';
import NavHeader from '@/components/navHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stars from '@/components/stars';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import type { Region } from 'react-native-maps'
import GroupMemberList from '@/components/groupMemberList';
import { colors, images } from '@/constants';
import CustomPressIcon from '@/components/buttons/customPressIcon';
import ExpandableIcon from '@/components/buttons/expandableIcon';
import { Group } from '@/model/models';

const GroupsDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    const group = null

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
                <GroupMemberList members={group.groupMembers} />
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