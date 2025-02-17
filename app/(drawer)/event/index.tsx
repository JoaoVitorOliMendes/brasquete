import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import CustomTitle from '@/components/customTitle'
import CardEvent from '@/components/card/cardEvent'
import { supabase } from '@/api/supabase'
import useGetEventsForGroups from '@/api/eventsApi'
import { useAuthUser } from '@/api/authApi'
import useGetGroupMemberForUser from '@/api/groupMemberApi'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import transformClass from '@/util/transformDate'
import { Event as GroupEvent, EventModel } from '@/model/models'

const Events = () => {    
    const { data: eventsData, refetch } = useGetEventsForGroups()

    console.log('eventsData', eventsData)

    useRefreshOnFocus(refetch)

    return (
        <SafeAreaView className='flex-1'>
            <ScrollView>
                <CustomDrawerHeader title='Próximos Eventos' />
                {/* <CustomTitle title='Eventos' sizeClass='text-4xl' className='m-4' /> */}
                <View className='p-4'>
                    {
                        eventsData &&
                        eventsData.map((item) => {
                            return <CardEvent event={transformClass<GroupEvent, EventModel>(item)} key={item.id} />
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Events