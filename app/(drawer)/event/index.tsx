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
import IconConcat from '@/components/iconConcat'

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
                        (eventsData && eventsData.length) ?
                            eventsData.map((item) => {
                                return <CardEvent event={item} key={item.id} />
                            })
                            :
                            <View
                                className='flex-row justify-center align-center opacity-50 mt-20'
                            >
                                <CustomTitle
                                    title='Sem eventos programados'
                                    sizeClass='text-2xl'
                                />
                                <IconConcat icon='basketball-outline' className='ml-4' />
                            </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EventsIndex