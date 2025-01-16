import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { GroupMember } from '@/model/api'
import CustomPressIcon from '../buttons/customPressIcon'

interface PlayerCardProps {
    player: GroupMember,
    className?: string,
    onIconPress?: () => void
}

const PlayerCard = ({ player, className, onIconPress }: PlayerCardProps) => {
    return (
        <View className={`flex flex-row flex-wrap items-center ${className}`}>
            <View className='basis-1/4 p-5'>
                <Image
                    className='rounded-full'
                    style={{ width: '100%', height: 'auto', aspectRatio: 1 / 1 }}
                    source={images.person}
                />
            </View>
            <View className='basis-1/2'>
                <Text>
                    {player.user?.name}
                </Text>
                <Text>
                    {player.position}
                </Text>
            </View>
            <View className='basis-1/4'>
                {onIconPress && <CustomPressIcon iconProps={{ icon: 'close', color: 'black' }} onPress={onIconPress} />}
            </View>
        </View>
    )
}

export default PlayerCard