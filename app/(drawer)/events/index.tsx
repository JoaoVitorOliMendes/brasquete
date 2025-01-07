import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomDrawerHeader from '@/components/customDrawerHeader'
import CustomTitle from '@/components/customTitle'
import { Event } from '@/model/api'

const Events = () => {

    const data: Event[] = []

    return (
        <SafeAreaView className='flex-1'>
            <ScrollView>
                <CustomDrawerHeader />
                <CustomTitle title='Eventos' sizeClass='text-4xl' className='m-4' />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Events