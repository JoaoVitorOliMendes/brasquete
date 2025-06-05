import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import IconConcat from './iconConcat';
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';

interface CustomImagePickerProps {
    imageUrl: string,
    setImage: (img: ImagePicker.ImagePickerAsset) => void
}

const CustomImagePicker = ({ imageUrl, setImage }: CustomImagePickerProps) => {
    const [error, setError] = useState(false)

    const requestPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const selectImage = async () => {
        await requestPermissions()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    }

    useEffect(() => {
        setError(false)
    }, [imageUrl])
    
    return (
        <Pressable onPress={selectImage}>
            <Image
                className='rounded-full !w-48 !h-48 border-4 p-5 self-center'
                source={!error ? { uri: imageUrl } : images.person}
                onError={() => {
                    setError(true)
                }}
            />
        </Pressable>
    )
}

export default CustomImagePicker