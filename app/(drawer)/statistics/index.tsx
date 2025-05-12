import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import { images } from '@/constants'
import { ScrollView } from 'react-native'
import CardStatistics from '@/components/card/cardStatistics'
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '@/api/authApi'
import { getPlayerStatistics } from '@/api/playerScoreApi'

const PersonalAvg = () => {
  const { data: user, isLoading } = useQuery(['user'], fetchUser)
  const { data: userAvg } = useQuery(['user', 'avg', user?.id], () => getPlayerStatistics(user?.id), {
    enabled: !!user?.id
  })

  return (
    <View>
      <CustomDrawerHeader title='Desempenho' />
      <Image
        className='rounded-full !w-48 !h-48 my-5 mb-20 self-center'
        source={images.person}
      />
      <ScrollView>
        <View className='p-4'>
          {
            userAvg && userAvg.map((item, idx) => (
              <CardStatistics key={idx} title={item.score} value={item.avgstat} />
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default PersonalAvg