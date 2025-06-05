import { images } from '@/constants';
import { Player, PlayerScore } from '@/model/models';
import { Json } from '@/model/supabaseTypes';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import CustomImage from '../customImage';

interface PlayerScoreCardProps {
    player: {
        name: string;
        profile_img: string;
        player_score: Json;
    }
}

const PlayerScoreCard = ({ player }: PlayerScoreCardProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <View className="mb-4 bg-gray-100 rounded-lg shadow-md">
            {/* Header */}
            <TouchableOpacity
                onPress={toggleCollapse}
                className="flex flex-row items-center p-4"
            >
                {/* Square Image */}
                <CustomImage
                    imageUrl={player.profile_img}
                    altImage={images.person}
                    className="w-16 h-16 rounded-md mr-4"
                    style={null}
                />
                {/* Text */}
                <Text className="text-lg font-bold text-black">{player.name}</Text>
            </TouchableOpacity>

            {/* Collapsible Content */}
            <Collapsible collapsed={isCollapsed}>
                <View className="p-4">
                    {
                        (player.player_score as {
                            score: string;
                            count: number;
                        }[]).map((item, idx) => {
                            return (
                                <View key={idx} className="flex flex-row justify-between items-center mb-2">
                                    <Text className="text-gray-700">{item.score}</Text>
                                    <Text className="text-gray-700">{item.count}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </Collapsible >
        </View >
    );
};

export default PlayerScoreCard;