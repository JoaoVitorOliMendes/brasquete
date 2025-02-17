import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import CustomPressIcon from '@/components/buttons/customPressIcon'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import CustomTitle from '@/components/customTitle'
import CardGroup from '@/components/card/cardGroup'
import { Group } from '@/model/api'
import ExpandableIcon from '@/components/buttons/expandableIcon'
import { useRouter } from 'expo-router'

const SearchGroup = () => {
    const router = useRouter()
    const data = null

    if (!data)
        router.back()

    return (
        <SafeAreaView className='flex-1'>
            <CustomDrawerHeader title='Grupos' />
            <ScrollView>
                <View className='p-4'>
                    {
                        data.map((item) => {
                            return <CardGroup group={item} key={item.id} />
                        })
                    }
                </View>
            </ScrollView>
            <ExpandableIcon menuItems={[
                {
                    icon: 'filter',
                    label: 'Filtros',
                    onPress: () => {
                        console.log('Filtros')
                    }
                },
                {
                    icon: 'map',
                    label: 'Mapa',
                    onPress: () => {
                        console.log('Mapa')
                    }
                }
            ]} />
        </SafeAreaView>
    )
}

export default SearchGroup