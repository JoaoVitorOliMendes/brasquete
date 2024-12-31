import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const GroupsDetails = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>GroupsDetails {id}</Text>
        </View>
    )
}

export default GroupsDetails