import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from './customButton'
import { useRouter } from 'expo-router'
import { Group } from '@/model/api'
import Stars from './stars'

interface CardGroupProps {
    group: Group
}

const CardGroup = ({ group }: CardGroupProps) => {
    const router = useRouter()

    const concatLocation = () => {
        if (group.location) {
            return `${group.location.streetNumber} ${group.location.street}, ${group.location.neighborhood}\n${group.location.city}, ${group.location.state} ${group.location.country}`
        }
        return "Endereço não definido"
    }

    return (
        <View className='bg-primary border-solid border-b-2 border-black flex flex-column p-5'>
            <View className='flex flex-row justify-between items-center my-4'>
                <Text className='text-white text-2xl'>
                    {group.name}
                </Text>
                <Text className='text-white'>
                    <Stars label='Nível: ' rating={group.level} textClassName='font-bold text-white' disabled />
                </Text>
            </View>
            <View className='my-2'>
                <Text className='text-white'>
                    {(group.events && group.events[0].date) || 'Sem eventos definidos'}
                </Text>
            </View>
            <View className='my-2'>
                <Text className='text-white'>
                    {concatLocation()}
                </Text>
            </View>
            <View className='flex flex-row justify-between my-5'>
                <CustomButton color='secondary' type='filled' label='Ver Detalhes' onPress={() => router.push(`/groups/${group.id}`)} />
                <CustomButton color='white' type='outline' label='Participar' onPress={() => console.log} />
            </View>
        </View>
    )
}

export default CardGroup