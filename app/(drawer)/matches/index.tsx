import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTitle from '@/components/customTitle'
import CardMatch from '@/components/card/cardMatch'
import CardGroup from '@/components/card/cardGroup'
import { Group } from '@/model/models'
import { useRouter } from 'expo-router'

const Matches = () => {
  const router = useRouter()
  const data = null

  if (!data)
    router.back()
  
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