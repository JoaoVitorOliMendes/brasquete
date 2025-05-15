import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import CustomButton from '../buttons/customButton'
import { GroupEventModel } from '@/model/models'
import DropShadow from 'react-native-drop-shadow'
import CustomTitle from '../customTitle'
import { days, images } from '@/constants'
import MovingLoadingBar from '../horizontalLoadingIndicator'
import { useQuery } from '@tanstack/react-query'
import { getOnGoingMatchForEvent } from '@/api/matchApi'
import CustomImage from '../customImage'

interface CardGroupEventProps {
    event: GroupEventModel
}

const CardGroupEvent = ({ event }: CardGroupEventProps) => {
    const router = useRouter()
    const { data: onGoingMatchData, refetch } = useQuery(['onGoingMatch', event.id], () => {
        return getOnGoingMatchForEvent(event)
    })

    const handlePress = async () => {
        const promOnGoingMatchData = await refetch()
        if (promOnGoingMatchData.data && promOnGoingMatchData.data.length > 0) {
            router.push(`/event/${event.id}/match?matchId=${onGoingMatchData[0].id}`)
        } else {
            router.push(`/event/${event.id}`)
        }
    }

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
                onPress={handlePress}
                activeOpacity={0.5}
                className='bg-primary rounded-lg flex flex-column p-5 mb-10'
            >
                <View className='flex flex-row flex-wrap justify-between items-center'>
                    {/* <MovingLoadingBar className='basis-full mb-5' /> */}
                    <View className='basis-3/12 flex flex-row flex-wrap pr-4 border-solid border-white border-r-2'>
                        <CustomTitle title={event.date?.getDate().toString() || ''} color='white' sizeClass='text-4xl' className='basis-full text-center' />
                        <Text className='text-white text-center basis-full'>
                            {days.days[event.date?.getDay() || 0].acron.toUpperCase()}
                        </Text>
                    </View>
                    <View className='basis-5/12 p-5'>
                        <Text className='text-white text-center text-3xl mb-2'>
                            {event.groups?.name}
                        </Text>
                        <Text className='text-white text-center'>
                            {('0' + (event.date?.getDate() || 0).toString()).slice(-2)}
                            /
                            {('0' + ((event.date?.getMonth() || 0) + 1).toString()).slice(-2)}
                            /
                            {event.date?.getFullYear().toString().slice(-2)}
                            {' '}
                            {('0' + (event.date?.getHours() || 0).toString()).slice(-2)}
                            :
                            {('0' + (event.date?.getMinutes() || 0).toString()).slice(-2)}
                        </Text>
                    </View>
                    <View className='basis-4/12'>
                        <CustomImage
                            className='rounded-lg'
                            altImage={images.map}
                            imageUrl={event.groups?.location?.location_img || ''}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </DropShadow>
    )
}

export default CardGroupEvent