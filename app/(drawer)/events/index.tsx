import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomDrawerHeader from '@/components/customDrawerHeader'
import CustomTitle from '@/components/customTitle'

const Events = () => {

    const data: Group[] = [
        {
            id: 'omdcmkod',
            name: 'Grupo 1',
            level: 'Intermediário',
            address: 'Rua Reinado do Cavalo Marinho',
            dateTime: new Date()
        }, {
            id: 'omdcmkod2',
            name: 'Grupo 1',
            level: 'Intermediário',
            address: 'Rua Reinado do Cavalo Marinho',
            dateTime: new Date()
        }, {
            id: 'omdcmkod3',
            name: 'Grupo 1',
            level: 'Intermediário',
            address: 'Rua Reinado do Cavalo Marinho',
            dateTime: new Date()
        }, {
            id: 'omdcmkod4',
            name: 'Grupo 1',
            level: 'Intermediário',
            address: 'Rua Reinado do Cavalo Marinho',
            dateTime: new Date()
        },
    ]
    return (
        <SafeAreaView>
            <CustomDrawerHeader />
            <CustomTitle title='Eventos' sizeClass='text-4xl' className='m-4' />
            {/* <FlatList
                data={data}
                renderItem={({ item }) => <CardGroup group={item} />}
                keyExtractor={item => item.id}
            /> */}
        </SafeAreaView>
    )
}

export default Events