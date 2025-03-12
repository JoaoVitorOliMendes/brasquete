import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomButton from '../buttons/customButton'
import { useRouter } from 'expo-router'
import Stars from '../stars'
import MapView from 'react-native-maps'
import { images } from '@/constants'
import DropShadow from "react-native-drop-shadow";
import { Groups } from '@/model/models'

interface CardGroupProps {
    group: Groups,
}

const CardGroup = ({ group }: CardGroupProps) => {
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
                onPress={() => router.push(`/groups/${group.id}`)}
                activeOpacity={0.5}
                className='bg-primary rounded-lg flex flex-row flex-wrap p-5 mb-10'
            >
                <View className='basis-7/12 p-5'>
                    <Text className='text-white text-3xl mb-2'>
                        {group.name}
                    </Text>
                    <Text className='text-white my-2'>
                        <Stars label='Nível: ' rating={group.level} textClassName='font-bold text-white' disabled />
                    </Text>
                    {/* <Text className='text-white my-2'>
                        {(group.events && group.events[0]) ? group.events[0].date?.toLocaleString() : 'Sem eventos definidos'}
                    </Text> */}
                </View>
                <View className='basis-5/12 p-2'>
                    <Image
                        className='rounded-lg'
                        style={{ width: '100%', height: 'auto', aspectRatio: 1 / 1 }}
                        source={images.staticMapExample}
                    />
                </View>
                {/* <View className='my-2'>
                <Text className='text-white'>
                    {concatLocation()}
                </Text>
            </View> */}
                {/* <View className='flex flex-row-reverse justify-between my-5'>
                { joinGroup && <CustomButton color='white' type='outline' label='Participar' onPress={() => console.log} /> }
                <CustomButton color='secondary' type='filled' label='Ver Detalhes' onPress={() => router.push(`/groups/${group.id}`)} />
            </View> */}
            </TouchableOpacity >
        </DropShadow>
    )
}

export default CardGroup