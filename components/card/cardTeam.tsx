import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Team } from '@/model/models'
import DropShadow from 'react-native-drop-shadow'
import CustomTitle from '../customTitle'

interface CardTeamProps {
    team: Team,
    onClick: () => void
}

const CardTeam = ({ team, onClick }: CardTeamProps) => {
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
                onPress={onClick}
                activeOpacity={0.5}
                className='bg-primary rounded-lg flex flex-column p-3 mb-10'
            >
                <View className='flex flex-row flex-wrap justify-center items-center'>
                    <CustomTitle title={team.name} color='white' sizeClass='text-4xl' className='basis-full text-center' />
                </View>
            </TouchableOpacity>
        </DropShadow>
    )
}

export default CardTeam