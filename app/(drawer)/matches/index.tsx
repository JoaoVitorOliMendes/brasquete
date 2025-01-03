import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomDrawerHeader from '@/components/customDrawerHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTitle from '@/components/customTitle'
import CardMatch from '@/components/cardMatch'

const Matches = () => {
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
      <CustomTitle title='Partidas' sizeClass='text-4xl' className='m-4' />
      <FlatList
        data={data}
        renderItem={({ item }) => <CardMatch />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

export default Matches