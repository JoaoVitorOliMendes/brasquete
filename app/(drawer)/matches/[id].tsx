import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const MatchDetail = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>MatchDetail {id}</Text>
        </View>
    )
}

export default MatchDetail