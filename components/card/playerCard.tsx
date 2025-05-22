import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomPressIcon from '../buttons/customPressIcon'
import { Player } from '@/model/models'
import CustomImage from '../customImage'

interface PlayerCardProps {
    player: Player,
    className?: string,
    onIconPress?: () => void
}

const PlayerCard = ({ player, className, onIconPress }: PlayerCardProps) => {
    return (
        <View className={`flex flex-row flex-wrap items-center ${className}`}>
            <View className='basis-1/4 p-5'>
                <CustomImage
                    className='rounded-full'
                    imageUrl={player.group_member?.profiles?.profile_img}
                    altImage={images.person}
                />
            </View>
            <View className='basis-1/2'>
                <Text>
                    {player.group_member?.profiles? player.group_member?.profiles.first_name + player.group_member?.profiles.last_name : ''}
                </Text>
                <Text>
                    {player.group_member?.profiles?.position}
                </Text>
            </View>
            <View className='basis-1/4'>
                {onIconPress && <CustomPressIcon iconProps={{ icon: 'close', color: 'black' }} onPress={onIconPress} />}
            </View>
        </View>
    )
}

export default PlayerCard