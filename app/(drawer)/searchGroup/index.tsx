import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import CustomPressIcon from '@/components/customPressIcon'
import CustomDrawerHeader from '@/components/customDrawerHeader'
import CustomTitle from '@/components/customTitle'
import CardGroup from '@/components/cardGroup'
import { Group } from '@/model/api'
import ExpandableIcon from '@/components/expandableIcon'

const SearchGroup = () => {
    const data: Group[] = [
        {
            id: 1,
            description: 'Grupo do cotemig, faça parte e tals asdjahsd asdihaskjd asdjkhasdkjh askjdhaa aksja ksj askajks ',
            isPublic: true,
            level: 3,
            location: {
                city: 'Belo Horizonte',
                country: 'BR',
                latitude: -19.93634456787944,
                longitude: -43.96623943001032,
                neighborhood: 'Grajaú',
                state: 'Minas Gerais',
                street: 'Rua Santa Cruz',
                streetNumber: '560',
                coordsMatch: true
            },
            name: 'Grupo 1'
        }
    ]

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