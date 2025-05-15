import { View, Text } from 'react-native'
import React from 'react'

interface CardStatisticsProps {
  title: string
  value: string
}

const CardStatistics = ({ title, value }: CardStatisticsProps) => {
  return (
    <View className='flex flex-row justify-between items-center px-5 py-2 bg-primary rounded-lg mb-5'>
      <Text className='text-white text-lg'>{title}:</Text>
      <Text className='text-white text-lg'>{parseFloat(value).toFixed(2)}</Text>
    </View>
  )
}

export default CardStatistics