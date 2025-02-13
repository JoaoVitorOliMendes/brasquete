import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import CustomTitle from '@/components/customTitle'
import CardEvent from '@/components/card/cardEvent'
import { supabase } from '@/api/supabase'
import { Event as GroupEvent } from '@/model/models'
import { useGetPublicEventsQuery } from '@/api/eventsApi'
import LoadingIndicator from '@/components/loadingIndicator'

const Events = () => {
    // const [eventsData, setEventsData] = useState<GroupEvent[]>([])

    const { data: eventsData, isLoading } = useGetPublicEventsQuery({

    })


    if (isLoading) {
        return (
            <LoadingIndicator />
        )
    }

    // const data: Event[] = [
    //     {
    //         id: 1,
    //         date: new Date(),
    //         group: {
    //             id: 1,
    //             admin: {
    //                 id: 1,
    //                 name: 'João'
    //             },
    //             location: {
    //                 city: 'Belo Horizonte',
    //                 country: 'BR',
    //                 latitude: -19.93634456787944,
    //                 longitude: -43.96623943001032,
    //                 neighborhood: 'Grajaú',
    //                 state: 'Minas Gerais',
    //                 street: 'Rua Santa Cruz',
    //                 streetNumber: '560',
    //                 coordsMatch: true
    //             },
    //             level: 3,
    //             name: 'Grupo 1',
    //             groupMembers: [
    //                 {
    //                     id: 0,
    //                     confirmed: 'confirmed',
    //                     position: 'Ala',
    //                     userId: 0,
    //                     user: {
    //                         id: 0,
    //                         name: 'João'
    //                     }
    //                 },
    //                 {
    //                     id: 1,
    //                     confirmed: 'confirmed',
    //                     position: 'Pivo',
    //                     userId: 0,
    //                     user: {
    //                         id: 1,
    //                         name: 'Jamir'
    //                     }
    //                 },
    //                 {
    //                     id: 2,
    //                     confirmed: 'absent',
    //                     position: 'Armador',
    //                     userId: 0,
    //                     user: {
    //                         id: 2,
    //                         name: 'Diego'
    //                     }
    //                 },
    //                 {
    //                     id: 3,
    //                     confirmed: 'deciding',
    //                     position: 'Ala',
    //                     userId: 0,
    //                     user: {
    //                         id: 3,
    //                         name: 'Alberto'
    //                     }
    //                 }
    //             ],
    //         }
    //     }
    // ]

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

export default Events