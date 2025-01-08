import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ClassColor } from '@/model/ClassTypeColor'
import { Ionicons } from '@expo/vector-icons'

interface CustomCheckboxProps {
    className?: string,
    value?: boolean,
    color?: keyof ClassColor,
    label: string,
    size?: number,
    setValue?: () => void
}

const CustomCheckbox = ({ className, value, setValue, color = 'black', label, size = 24 }: CustomCheckboxProps) => {
    const borderColor: ClassColor = {
        white: 'border-white',
        black: 'border-black'
    }

    const textColor: ClassColor = {
        white: 'text-white',
        black: 'text-black'
    }
    return (
        <View className={className}>
            <View className='flex flex-row items-center'>
                <TouchableOpacity
                    onPress={setValue}
                    className={`border-solid border-2 rounded mr-5 flex justify-center align-center ${borderColor[color]}`}
                    style={{ width: size + 5, height: size + 5 }}
                >
                    {
                        value && <Ionicons name='checkmark' className='p-0 text-center' size={size} color={color} />
                    }
                </TouchableOpacity>
                <Text className={textColor[color]}>
                    {label}
                </Text>
            </View>
        </View>
    )
}

export default CustomCheckbox