import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import CustomTitle from '@/components/customTitle'
import CardGroup from '@/components/cardGroup'
import CustomDrawerHeader from '@/components/customDrawerHeader'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

const Groups = () => {

  const data: Group[] = [
    {
      id: 1,
      name: 'Grupo 1',
      level: 'Intermediário',
      address: 'Rua Reinado do Cavalo Marinho',
      dateTime: new Date()
    }, {
      id: 2,
      name: 'Grupo 1',
      level: 'Intermediário',
      address: 'Rua Reinado do Cavalo Marinho',
      dateTime: new Date()
    }, {
      id: 3,
      name: 'Grupo 1',
      level: 'Intermediário',
      address: 'Rua Reinado do Cavalo Marinho',
      dateTime: new Date()
    }, {
      id: 4,
      name: 'Grupo 1',
      level: 'Intermediário',
      address: 'Rua Reinado do Cavalo Marinho',
      dateTime: new Date()
    },
  ]
  return (
    <SafeAreaView>
      <CustomDrawerHeader />
      <CustomTitle title='Grupos' sizeClass='text-4xl' className='m-4' />
      <FlatList
        data={data}
        renderItem={({ item }) => <CardGroup group={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  )
}

export default Groups