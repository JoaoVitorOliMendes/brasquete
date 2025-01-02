import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomTitle from '@/components/customTitle';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const GroupsDetails = () => {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    const group: Group = {
        id: id.toString(),
        name: 'Grupo 1',
        level: 'Intermediário',
        address: 'Rua Reinado do Cavalo Marinho',
        dateTime: new Date()
    }

    if (!group) {
        router.back()
    }

    return (
        <View className='flex-1 p-4'>
            <MapView
                style={{ width: '100%', height: '50%' }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            <CustomTitle title={group.name || ''} sizeClass='text-4xl' />
            <Text>Endereço: {group.address}</Text>
            <Text>Nível: {group.level}</Text>
            <Text>Data: {group.dateTime?.toLocaleString()}</Text>
        </View>
    )
}

export default GroupsDetails