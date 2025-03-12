import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import CustomTitle from '@/components/customTitle'
import CardEvent from '@/components/card/cardEvent'
import { supabase } from '@/api/supabase'
import { useQuery } from '@tanstack/react-query'
import { getEventsForGroups } from '@/api/eventsApi'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'

const EventsIndex = () => {
    const { data: eventsData, refetch } = useQuery(['events'], getEventsForGroups)

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
                            return <CardEvent event={item} key={item.id} />
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EventsIndex