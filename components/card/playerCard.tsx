import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { Player } from '@/model/api'

interface PlayerCardProps {
    player: Player
}

const PlayerCard = ({ player }: PlayerCardProps) => {
    return (
        <View className='flex flex-row flex-wrap'>
            <View className='basis-1/4 p-5'>
                <Image
                    className='rounded-full'
                    style={{ width: '100%', height: 'auto', aspectRatio: 1 / 1 }}
                    source={images.person}
                />
            </View>
        </View>
    )
}

export default PlayerCard