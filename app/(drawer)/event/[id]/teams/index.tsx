import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import NavHeader from '@/components/navHeader'
import { useLocalSearchParams, useRouter } from 'expo-router'
import TeamPickerModal from '@/components/modals/teamPickerModal'
import CustomButton from '@/components/buttons/customButton'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUser } from '@/api/authApi'
import { getEventByid } from '@/api/eventsApi'
import Toast from 'react-native-toast-message'
import { getTeamsForEvent } from '@/api/teamApi'
import CardTeam from '@/components/card/cardTeam'
import { Team } from '@/model/models'

const Teams = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()
    const [modalVisible, setModalVisible] = useState(false)
    const [focusTeam, setFocusTeam] = useState<Team>()

    const { data: user } = useQuery(['user'], fetchUser)
    const { data: eventsData, isLoading: eventsLoading, isRefetching: eventsIsRefetching } = useQuery(['events', id], () => getEventByid(id))
    const { data: teamsData, isLoading: teamsLoading, isRefetching: teamsIsRefetching } = useQuery(['teams', id], () => getTeamsForEvent(eventsData!), {
        enabled: !!eventsData
    })

    const userMember = (eventsData?.groups?.group_member?.find((item) => item.user_id == user?.id))

    useEffect(() => {
        console.log(eventsData)
        console.log(teamsData)
        console.log(eventsLoading)
        console.log(teamsLoading)
        console.log(eventsIsRefetching)
        console.log(teamsIsRefetching)
    }, [eventsData])

    if (eventsLoading)
        return <></>

    if (!eventsLoading && !(eventsData && eventsData.groups)) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'No Event Found' })
        router.dismissTo('/event')
    }

    return (
        <>
            <NavHeader title='Divisão de times' iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo(`/event/${id}`) }} className={'bg-secondary'} />
            <ScrollView overScrollMode='never' persistentScrollbar showsVerticalScrollIndicator className='flex-1 bg-secondary'>
                <CustomButton label='Adicionar Time' onPress={() => {
                    setFocusTeam(undefined)
                    setModalVisible(true)
                }} />
                {
                    (teamsData && teamsData.length) ?
                    teamsData.map((team, idx) => {
                        return (
                            <View key={idx} className='my-3 p-3'>
                                <CardTeam onClick={() => {
                                    setFocusTeam(team)
                                    setModalVisible(true)
                                }} team={team} />
                            </View>
                        )
                    })
                    :
                    <></>
                }
            </ScrollView>
            <TeamPickerModal team={focusTeam} eventsData={eventsData!} visible={modalVisible} dismiss={() => {
                setFocusTeam(undefined)
                setModalVisible(false)
            }} />
        </>
    )
}

export default Teams