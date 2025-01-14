import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTitle from '@/components/customTitle'
import CardMatch from '@/components/card/cardMatch'
import { Group } from '@/model/api'
import CardGroup from '@/components/card/cardGroup'

const Matches = () => {
  const data: Group[] = [
    {
      id: 1,
      name: 'Grupo 1',
      level: 1,
    }, {
      id: 2,
      name: 'Grupo 1',
      level: 2,
    }, {
      id: 3,
      name: 'Grupo 1',
      level: 3
    }, {
      id: 4,
      name: 'Grupo 1',
      level: 4
    },
  ]
  return (
    <View>
      <CustomDrawerHeader />
      <CustomTitle title='Partidas' sizeClass='text-4xl' className='m-4' />
      <FlatList
        data={data}
        renderItem={({ item }) => <CardGroup group={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default Matches