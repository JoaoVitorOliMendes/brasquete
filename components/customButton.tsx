import { View, Text, GestureResponderEvent, TouchableWithoutFeedback, Pressable } from 'react-native'
import React from 'react'
import "../global.css"
import { ClassColor, ClassTypeColor } from '@/model/ClassTypeColor'
import Animated, { measure, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

interface CustomButtonProps {
    label: string
    type?: keyof ClassTypeColor,
    color?: keyof ClassColor,
    className?: string,
    onPress?: (event: GestureResponderEvent) => void
}

const CustomButton = ({ label, type='filled', color='primary', className, onPress }: CustomButtonProps) => {
    const typeColorBtn: ClassTypeColor = {
        outline: {
            primary: 'border-primary',
            secondary: 'border-secondary',
            white: 'border-white'
        },
        filled: {
            primary: 'bg-primary border-primary',
            secondary: 'bg-secondary border-secondary',
            white: 'bg-white border-white'
        }
    }

    const typeColorTxt: ClassTypeColor = {
        outline: {
            primary: 'text-primary',
            secondary: 'text-secondary',
            white: 'text-white'
        },
        filled: {
            primary: 'text-white',
            secondary: 'text-white',
            white: 'text-black'
        }
    }

    // WHY DOES NOT WORK?????
    // const animation = useSharedValue({
    //     translateX: 0,
    //     translateY: 0,
    //     scale: 0,
    //     boxWidth: 0,
    //     boxHeight: 0,
    //     opacity: 0.1,
    // })

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const scale = useSharedValue(0)
    const boxWidth = useSharedValue(0)
    const boxHeight = useSharedValue(0)
    const opacity = useSharedValue(0.1)

    const animatedRef = useAnimatedRef()

    const animationStyle = useAnimatedStyle(() => {
        const boxLayout = measure(animatedRef)
        if (boxLayout) {
            boxHeight.value = boxLayout.height
            boxWidth.value = boxLayout.width
        }
        const radius = Math.sqrt(boxHeight.value ** 2 + boxWidth.value ** 2)
        const diameter = radius * 2
        return {
            width: diameter,
            height: diameter,
            borderRadius: radius,
            opacity: opacity.value,
            transform: [{
                translateX: translateX.value - radius,
            },
            {
                translateY: translateY.value - radius
            },
            {
                scale: scale.value
            }]
        }
    })

    const handlePressIn = (event: GestureResponderEvent) => {
        opacity.value = 0.1
        translateX.value = event.nativeEvent.locationX
        translateY.value = event.nativeEvent.locationY
        scale.value = 0.25
        scale.value = withTiming(1, { duration: 200 })
    }

    const handlePressOut = (event: GestureResponderEvent) => {
        opacity.value = withTiming(0, { duration: 200 })
    }

    return (
        // TouchableWithoutFeedback does not support styling????? https://github.com/facebook/react-native/issues/18257
        <Pressable
            className={`${className ? className : null}`}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                className={`
                    p-4
                    rounded-2xl
                    overflow-hidden
                    border-solid border-2 
                    ${typeColorBtn[type]?.[color] ?? typeColorBtn.filled?.primary}
                `}
                //have no fking idea
                ref={animatedRef}
            >
                <Animated.View
                    className='
                        absolute
                        top-0
                        left-0
                        bg-black
                    '
                    style={[animationStyle]}
                />
                <Text className={`
                        text-center
                        ${typeColorTxt[type]?.[color] ?? typeColorTxt.filled?.white}
                    `}>
                    {label}
                </Text>
            </Animated.View>
        </Pressable>
    )
}

export default CustomButton