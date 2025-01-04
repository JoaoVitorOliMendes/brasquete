import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import CustomTitle from '@/components/customTitle'
import CardGroup from '@/components/cardGroup'
import CustomDrawerHeader from '@/components/customDrawerHeader'
import { Group } from '@/model/api'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const Groups = () => {

  const data: Group[] = [
    {
      id: 1,
      name: 'Grupo 1',
      level: 'Intermediário'
    }, {
      id: 2,
      name: 'Grupo 1',
      level: 'Intermediário'
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
    <SafeAreaView className='flex-1'>
      <CustomDrawerHeader />
      <ScrollView>
        <CustomTitle title='Grupos' sizeClass='text-4xl' className='m-4' />
        {
          data.map((item) => {
            return <CardGroup group={item} key={item.id} />
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Groups