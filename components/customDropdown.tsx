import { View, Text, TextInput, TextInputProps, Modal, TouchableWithoutFeedback, TouchableOpacity, GestureResponderEvent, Pressable, FlatList, StatusBar, ListRenderItemInfo } from 'react-native'
import React, { forwardRef, useRef, useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { ClassColor, ClassTypeColor } from '@/model/ClassTypeColor'
import { Controller, UseControllerProps } from 'react-hook-form'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { OptionItem } from '@/model/OptionItem'
import SelectDropdown from 'react-native-select-dropdown'
import { CustomPressIconProps } from './customPressIcon'

interface CustomDropdownProps {
    data: OptionItem[],
    type: keyof ClassTypeColor,
    color: keyof ClassColor,
    className?: string,
    formProps: UseControllerProps,
    inputProps: TextInputProps,
    errorMsg?: string
}

const CustomDropdown = forwardRef<TextInput, CustomDropdownProps>(({ data, type, color, className, formProps, inputProps, errorMsg = '' }, ref) => {
    const [dropdownOpened, setDropdownOpened] = useState(false)
    const [dropdownCoords, setDropdownCoords] = useState({
        top: 0,
        left: 0
    })
    const [dropdownWidth, setDropdownWidth] = useState(0)

    const inuptColor: ClassTypeColor = {
        outline: {
            primary: 'border-b-2 bg-primary-25 border-primary',
            secondary: 'border-b-2 bg-secondary-25 border-secondary',
            white: 'border-b-2 bg-white-25 border-white',
            black: 'border-b-2 bg-black-15 border-black',
        },
        filled: {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            white: 'bg-white'
        }
    }

    const animation = useSharedValue({ top: 0, fontSize: 14 })

    const animationStyle = useAnimatedStyle(() => {
        return {
            top: withTiming(animation.value.top, {
                duration: 125
            }),
            fontSize: withTiming(animation.value.fontSize, {
                duration: 125
            }),
        }
    })

    const openDropdown = (event: GestureResponderEvent) => {
        event.currentTarget.measure((_fx, _fy, w, h, px, py) => {
            setDropdownCoords({
                top: (py + h) - (StatusBar.currentHeight || 0),
                left: px
            })
            setDropdownWidth(w)
        });
        setDropdownOpened(!dropdownOpened)
    }

    const handleSelect = (item?: OptionItem) => {
        if (item) {
            animation.value = {
                top: -18,
                fontSize: 12
            }
        } else {
            animation.value = {
                top: 0,
                fontSize: 14
            }
        }
        setDropdownOpened(!dropdownOpened)
    }

    return (
        <Controller
            {...formProps}
            render={({ field }) => (
                <View className={`
                    ${className ? className : null}
                `}>
                    <TouchableOpacity
                        onPress={openDropdown}
                        className={`
                            rounded-t-lg
                            pt-3
                            px-2
                            flex
                            flex-row
                            gap-3
                            items-center
                            h-16
                            ${inuptColor[type]?.[color] ?? inuptColor.filled?.primary}
                        `}
                    >
                        <AntDesign className='flex-none' name={dropdownOpened ? 'up' : 'down'} size={24} />
                        <View className='flex-auto h-full w-full relative flex justify-center'>
                            <View className='absolute w-full top-0 bottom-0 flex justify-center'>
                                <Animated.Text className='opacity-50' style={[animationStyle]}>
                                    <Text>
                                        {inputProps.placeholder}
                                    </Text>
                                    {
                                        formProps.rules?.required &&
                                        <Text className='color-red-700'>
                                            &nbsp;*
                                        </Text>
                                    }
                                </Animated.Text>
                            </View>
                            <Text>
                                {(field.value && field.value['label']) || ''}
                            </Text>
                        </View>
                        {
                            field.value &&
                            <Ionicons onPress={() => {
                                field.onChange(null)
                                handleSelect(undefined)
                            }} className='flex-none' name={'close'} size={24} />
                        }
                    </TouchableOpacity>
                    <View>
                        <Modal visible={dropdownOpened} animationType='none' transparent>
                            <Pressable
                                onPressOut={() => setDropdownOpened(false)}
                                className='relative h-full w-full'
                            >
                                <View className='absolute w-full rounded-b-lg bg-white overflow-hidden' style={{ top: dropdownCoords.top, left: dropdownCoords.left, width: dropdownWidth }}>
                                    <FlatList
                                        data={data}
                                        renderItem={(item) => (
                                            <TouchableOpacity className={`p-4 w-full ${item.item.value === (field.value && field.value['value'] || '') && 'bg-black-50'}`} onPress={() => {
                                                field.onChange(item.item)
                                                handleSelect(item.item)
                                            }}>
                                                <Text>{item.item.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item) => item.value}
                                    />
                                </View>
                            </Pressable>
                        </Modal>
                    </View>
                    {
                        errorMsg &&
                        <Text className='mt-1 text-red-700'>
                            {errorMsg}
                        </Text>
                    }
                </View>
            )}
        />
    )
})

export default CustomDropdown