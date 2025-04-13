import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useSharedValue, withRepeat, withTiming, useAnimatedStyle, measure, useAnimatedRef, withSpring } from 'react-native-reanimated';

interface MovingLoadingBarProps {
    className?: string
}

const MovingLoadingBar = ({ className }: MovingLoadingBarProps) => {
    const width = useSharedValue(0)
    const animatedRef = useAnimatedRef()

    const progressBarWidthAnimated = useAnimatedStyle(() => {
        
        return {
            left: width.value * 2,
            transform: [{
                translateX: withRepeat(
                    withTiming(
                        width.value * 2,
                        {
                            duration: 2500,
                            easing: Easing.linear
                        },
                        () => {
                            const boxLayout = measure(animatedRef)
                            
                        }
                    ),
                    -1,
                    true
                )
            }]
        }
    }, [width])

    return (
        <View className={className}>
            <View
                className='h-5 bg-gray-300 rounded-full'
                onLayout={e => width.value = e.nativeEvent.layout.width}
            >
                <Animated.View className='h-full rounded-full bg-green-500' ref={animatedRef} style={progressBarWidthAnimated} />
            </View>
        </View>
    );
};

export default MovingLoadingBar;