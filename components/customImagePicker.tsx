import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

interface CustomImagePickerProps {
    imageUrl: string,
    setImage: (str: string) => void
}

const CustomImagePicker = ({ imageUrl, setImage }: CustomImagePickerProps) => {

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
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return (
        <Pressable onPress={selectImage}>
            <Image
                className='rounded-full !w-48 !h-48 my-5 mb-10 self-center'
                source={{ uri: imageUrl }}
            />
        </Pressable>
    )
}

export default CustomImagePicker