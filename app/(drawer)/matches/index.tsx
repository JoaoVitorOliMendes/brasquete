import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomDrawerHeader from '@/components/customDrawerHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTitle from '@/components/customTitle'
import CardMatch from '@/components/cardMatch'
import { Group } from '@/model/api'
import CardGroup from '@/components/cardGroup'

const Matches = () => {
  const data: Group[] = [
    {
      id: 1,
      name: 'Grupo 1',
      level: 'Intermediário',
    }, {
      id: 2,
      name: 'Grupo 1',
      level: 'Intermediário',
    }, {
      id: 3,
      name: 'Grupo 1',
      level: 'Intermediário'
    }, {
      id: 4,
      name: 'Grupo 1',
      level: 'Intermediário'
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