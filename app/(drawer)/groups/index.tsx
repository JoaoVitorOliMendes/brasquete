import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { router, Slot } from 'expo-router'
import CustomTitle from '@/components/customTitle'
import CardGroup from '@/components/card/cardGroup'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '@/components/buttons/customButton'
import CustomPressIcon from '@/components/buttons/customPressIcon'
import ExpandableIcon from '@/components/buttons/expandableIcon'
import { Group } from '@/model/models'

const Groups = () => {
  const data = null

  if (!data)
    router.back()

  return (
    <SafeAreaView className='flex-1 relative'>
      <CustomDrawerHeader title='Meus Grupos' />
      <ScrollView>
        <View className='p-4'>
          {/* <CustomTitle title='Meus Grupos' sizeClass='text-4xl' className='mb-4' /> */}
          {
            data.map((item) => {
              return <CardGroup group={item} key={item.id} />
            })
          }
        </View>
      </ScrollView>
      <ExpandableIcon menuItems={[
        {
          icon: 'add',
          label: 'Criar Grupo',
          onPress: () => {
            router.push('/groups/editGroup')
          }
        }
      ]} />
    </SafeAreaView>
  )
}

export default Groups