import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import CustomButton from './customButton'
import { Event as GroupEvent } from '@/model/Event'

interface CardEventProps {
    event: GroupEvent
}

const CardEvent = ({ event }: CardEventProps) => {
    const router = useRouter()

    return (
        <View className='bg-primary border-solid border-b-2 border-black flex flex-column p-5'>
            <View className='flex flex-row justify-between items-baseline my-4'>
                <Text className='text-white text-2xl'>
                    {event.id}
                </Text>
                <Text className='text-white'>
                    Nível: {event.id}
                </Text>
            </View>
            <View className='flex flex-row justify-between my-5'>
                <CustomButton color='secondary' type='filled' label='Ver Detalhes' onPress={() => router.push(`/groups/${group.id}`)} />
                <CustomButton color='white' type='outline' label='Participar' onPress={() => console.log} />
            </View>
        </View>
    )
}

export default CardEvent