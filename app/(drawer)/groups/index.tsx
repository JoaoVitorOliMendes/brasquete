import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { router, Slot } from 'expo-router'
import CustomTitle from '@/components/customTitle'
import CardGroup from '@/components/card/cardGroup'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import { Group } from '@/model/api'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '@/components/buttons/customButton'
import CustomPressIcon from '@/components/buttons/customPressIcon'
import ExpandableIcon from '@/components/buttons/expandableIcon'

const Groups = () => {
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