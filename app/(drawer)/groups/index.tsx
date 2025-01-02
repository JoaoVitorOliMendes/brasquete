import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import CustomTitle from '@/components/customTitle'
import CardGroup from '@/components/cardGroup'

const Groups = () => {

  const data: Group[] = [
    {
      id: 'omdcmkod',
      name: 'Grupo 1',
      level: 'Intermediário',
      address: 'Rua Reinado do Cavalo Marinho',
      dateTime: new Date()
    }
  ]
  return (
    <View>
      <CustomTitle title='Grupos' sizeClass='text-4xl' className='m-4' />
      <FlatList
        data={data}
        renderItem={({item}) => <CardGroup group={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Groups