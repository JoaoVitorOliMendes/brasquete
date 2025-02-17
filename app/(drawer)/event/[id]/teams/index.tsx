import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import NavHeader from '@/components/navHeader'
import { useLocalSearchParams, useRouter } from 'expo-router'
import TeamPickerModal from '@/components/modals/teamPickerModal'
import CustomButton from '@/components/buttons/customButton'
import { Group } from '@/model/models'

const Teams = () => {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const [modalVisible, setModalVisible] = useState(false)

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