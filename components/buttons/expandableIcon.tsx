import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomPressIcon, { CustomPressIconProps } from './customPressIcon'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import IconConcat from '../iconConcat'

export interface MenuItem {
    label: string,
    icon: keyof typeof Ionicons.glyphMap,
    onPress: () => void
}

interface ExpandableIconProps {
    menuItems: MenuItem[]
}

const ExpandableIcon = ({ menuItems }: ExpandableIconProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const sharedTop = useSharedValue(0)
    const sharedOpacity = useSharedValue(0)
    const sharedScale = useSharedValue(0)

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: sharedTop.value,

                },
                {
                    scale: sharedScale.value
                }
            ],
            opacity: sharedOpacity.value
        }
    })

    useEffect(() => {
        if (isOpen) {
            sharedTop.value = withTiming(0, {
                duration: 125
            })
            sharedOpacity.value = withTiming(1, {
                duration: 125
            })
            sharedScale.value = withTiming(1, {
                duration: 125
            })
        } else {
            sharedTop.value = withTiming(50, {
                duration: 125
            })
            sharedOpacity.value = withTiming(0, {
                duration: 125
            })
            sharedScale.value = withTiming(0, {
                duration: 125
            })
        }
    }, [isOpen])

    return (
        <View className='absolute bottom-12 right-4 flex items-center'>
            <Animated.View style={[animationStyle]}>
                {
                    menuItems.map((item, idx) => {
                        return (
                            <TouchableOpacity key={idx} onPress={item.onPress} className='flex flex-row flex-wrap justify-center items-center gap-3 my-1'>
                                <Text className='absolute right-full mr-1 bg-gray-300 p-2 px-3 rounded-lg'>
                                    {item.label}
                                </Text>
                                <IconConcat icon={item.icon} size={24} color='black' className='rounded-full flex justify-center align-center p-3 bg-gray-300' />
                            </TouchableOpacity>
                        )
                    })
                }
            </Animated.View>
            <CustomPressIcon iconProps={{ icon: isOpen ? 'close' : 'add', size: 36 }} onPress={() => setIsOpen(!isOpen)} className='w-20 h-20 mt-3 bg-emerald-700 font-bold' />
        </View>
    )
}

export default ExpandableIcon