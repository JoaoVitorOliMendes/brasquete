import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import moment from 'moment';
import CustomTitle from '../customTitle';
import { useRouter } from 'expo-router';

interface CardMatchProps {
    match: {
        match_id: string;
        match_start: string;
        match_end: string;
        team_a_name: string;
        team_b_name: string;
        team_a_points: string;
        team_b_points: string;
    };
}

const CardMatch = ({ match }: CardMatchProps) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/matches/${match.match_id}`);
    };

    // Format the start time using moment.js
    const formattedStartDate = moment(match.match_start).format('DD/MM/YY');
    const formattedStartTime = moment(match.match_start).format('HH:mm');

    return (
        <DropShadow
            style={{
                shadowColor: '#000',
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
                className="bg-primary rounded-lg p-5 mb-10"
            >
                {/* Start Time */}
                <View className="flex flex-row justify-center items-center mb-3">
                    <CustomTitle title={`${formattedStartDate}`} color='white' sizeClass='text-3xl' className='mx-3' />
                    <CustomTitle title={`${formattedStartTime}`} color='white' sizeClass='text-2xl' />
                </View>

                <View className="h-[3px] bg-white opacity-50 mb-3" />

                {/* Teams and Points */}
                <View className="flex flex-row justify-between items-center">
                    {/* Team A */}
                    <View className="flex items-center">
                        <CustomTitle title={match.team_a_name} sizeClass='text-3xl' color='white' />
                        <CustomTitle title={match.team_a_points} sizeClass='text-3xl' color='white' />
                    </View>

                    <CustomTitle title='X' sizeClass='text-5xl' color='white' />

                    {/* Team B */}
                    <View className="flex items-center">
                        <CustomTitle title={match.team_b_name} sizeClass='text-3xl' color='white' />
                        <CustomTitle title={match.team_b_points} sizeClass='text-3xl' color='white' />
                    </View>
                </View>
            </TouchableOpacity>
        </DropShadow>
    );
};

export default CardMatch;