import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import CustomPressIcon from '@/components/buttons/customPressIcon'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import CustomTitle from '@/components/customTitle'
import CardGroup from '@/components/card/cardGroup'
import ExpandableIcon from '@/components/buttons/expandableIcon'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '@/api/authApi'
import { getAvailableGroups } from '@/api/groupsApi'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'

const SearchGroupIndex = () => {
    const router = useRouter()

    const { data: user, isLoading } = useQuery(['user'], fetchUser)

    const { data: groupsData, refetch } = useQuery(['groups'], () => getAvailableGroups(user!.id), {
        enabled: !!user
    })

    useRefreshOnFocus(refetch)

    return (
        <SafeAreaView className='flex-1'>
            <CustomDrawerHeader title='Grupos' />
            <ScrollView>
                <View className='p-4'>
                    {
                        groupsData &&
                        groupsData.map((item) => {
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

export default SearchGroupIndex