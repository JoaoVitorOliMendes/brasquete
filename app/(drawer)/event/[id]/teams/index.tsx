import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import NavHeader from '@/components/navHeader'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Event as GroupEvent } from '@/model/api/event'
import { Group } from '@/model/api'
import TeamPickerModal from '@/components/modals/teamPickerModal'
import CustomButton from '@/components/buttons/customButton'

const Teams = () => {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const [modalVisible, setModalVisible] = useState(false)

    const confirmedGroupMembersWithoutTeam: Group = {
        id: 1,
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
                confirmed: 'confirmed',
                position: 'Armador',
                userId: 0,
                user: {
                    id: 2,
                    name: 'Diego'
                }
            },
            {
                id: 3,
                confirmed: 'confirmed',
                position: 'Ala',
                userId: 0,
                user: {
                    id: 3,
                    name: 'Alberto'
                }
            }
        ],
    }

    return (
        <>
            <NavHeader title='Divisão de times' iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo(`/event/${id}`) }} className={'bg-secondary'} />
            <ScrollView overScrollMode='never' persistentScrollbar showsVerticalScrollIndicator className='flex-1 bg-secondary'>
                <CustomButton label='Adicionar Time' onPress={() => setModalVisible(true)} />
            </ScrollView>
            <TeamPickerModal visible={modalVisible} dismiss={() => setModalVisible(false)} />
        </>
    )
}

export default Teams