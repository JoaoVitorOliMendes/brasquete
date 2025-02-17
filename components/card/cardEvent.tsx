import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import CustomButton from '../buttons/customButton'
import { EventModel } from '@/model/models'
import DropShadow from 'react-native-drop-shadow'
import CustomTitle from '../customTitle'
import { days, images } from '@/constants'

interface CardEventProps {
    event: EventModel
}

const CardEvent = ({ event }: CardEventProps) => {
    const router = useRouter()

    return (
        <DropShadow
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3,
            }}
        >
            <TouchableOpacity
                onPress={() => router.push(`/event/${event.id}`)}
                activeOpacity={0.5}
                className='bg-primary rounded-lg flex flex-column p-5'
            >
                <View className='flex flex-row flex-wrap justify-between items-center'>
                    <View className='basis-3/12 flex flex-row flex-wrap pr-4 border-solid border-white border-r-2'>
                        <CustomTitle title={event.date?.getUTCDate().toString() || ''} color='white' sizeClass='text-4xl' className='basis-full text-center' />
                        <Text className='text-white text-center basis-full'>
                            {days.days[event.date?.getUTCDay() || 0].acron.toUpperCase()}
                        </Text>
                    </View>
                    <View className='basis-5/12 p-5'>
                        <Text className='text-white text-center text-3xl mb-2'>
                            {event.groups?.name}
                        </Text>
                        <Text className='text-white text-center'>
                            {('0' + (event.date?.getUTCDate() || 0).toString()).slice(-2)}
                            /
                            {('0' + ((event.date?.getUTCMonth() || 0) + 1).toString()).slice(-2)}
                            /
                            {event.date?.getUTCFullYear().toString().slice(-2)}
                            {' '}
                            {('0' + (event.date?.getUTCHours() || 0).toString()).slice(-2)}
                            :
                            {('0' + (event.date?.getUTCMinutes() || 0).toString()).slice(-2)}
                        </Text>
                    </View>
                    <View className='basis-4/12'>
                        <Image
                            className='rounded-lg'
                            style={{ width: '100%', height: 'auto', aspectRatio: 1 / 1 }}
                            source={images.staticMapExample}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </DropShadow>
    )
}

export default CardEvent