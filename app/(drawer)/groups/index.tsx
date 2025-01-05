import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { router, Slot } from 'expo-router'
import CustomTitle from '@/components/customTitle'
import CardGroup from '@/components/cardGroup'
import CustomDrawerHeader from '@/components/customDrawerHeader'
import { Group } from '@/model/api'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '@/components/customButton'
import CustomPressIcon from '@/components/customPressIcon'

const Groups = () => {

  const data: Group[] = [
    {
      id: 0,
      name: "string",
      level: "string",
      location: {
        id: 0,
        latitude: 0,
        longitude: 0
      },
      events: [
        {
          id: 0,
          date: "2025-01-04T20:20:27.029Z",
        }
      ]
    }
  ]
  return (
    <SafeAreaView className='flex-1'>
      <CustomPressIcon icon='add' size={36} onPress={() => router.push('/groups/editGroup')} className='absolute bottom-12 right-4 w-20 h-20 bg-emerald-700' />
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