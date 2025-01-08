import { View, Text, TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import React, { forwardRef, RefObject, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { ClassColor, ClassTypeColor } from '@/model/ClassTypeColor'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { CustomPressIconProps } from '@/components/customPressIcon'
import CustomPressIcon from '@/components/customPressIcon'

interface CustomInputProps<FormType extends FieldValues> {
    type: keyof ClassTypeColor,
    color: keyof ClassColor,
    rightIcon?: CustomPressIconProps,
    leftIcon?: CustomPressIconProps,
    className?: string,
    formProps: UseControllerProps<FormType>,
    inputProps: TextInputProps,
    errorMsg?: string,
    multiline?: boolean,
    numberOfLines?: number,
    disabled?: boolean,
    inputRef: RefObject<TextInput>
    //WOW it just works :p
}

const CustomInput = <FormType extends FieldValues,>({ type, color, rightIcon, leftIcon, className, formProps, inputProps, inputRef, multiline = false, numberOfLines, disabled = false }: CustomInputProps<FormType>) => {
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

    return (
        <Controller
            {...formProps}
            render={({ field, fieldState }) => {
                const handleLabel = () => {
                    if (!field.value) {
                        animation.value = {
                            top: 0,
                            fontSize: 14
                        }
                    } else {
                        animation.value = {
                            top: -18,
                            fontSize: 12
                        }
                    }
                }

                useEffect(() => {
                    handleLabel()
                }, [field.value])

                return (
                    <View className={`
                    ${className ? className : null}
                `}>
                        <View className={`
                        rounded-t-lg
                        pt-3
                        mb-1
                        px-2
                        flex
                        flex-row
                        min-h-16
                        gap-3
                        items-center
                        ${inuptColor[type]?.[color] ?? inuptColor.filled?.primary}
                    `}>
                            {leftIcon && <CustomPressIcon {...leftIcon} />}
                            <View className={`
                            flex-auto
                            relative
                            ${!leftIcon && 'ml-4'}
                        `}>
                                <View className='absolute w-full top-0 bottom-0 flex justify-center z-0'>
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
                                <TextInput
                                    {...inputProps}
                                    caretHidden={false}
                                    ref={inputRef}
                                    onFocus={handleLabel}
                                    onEndEditing={handleLabel}
                                    placeholder=''
                                    className='caret-black pl-0 z-10'
                                    onChangeText={field.onChange}
                                    value={field.value || ''}
                                    multiline
                                    numberOfLines={numberOfLines}
                                    editable={disabled} selectTextOnFocus={disabled}
                                    style={{ minHeight: (numberOfLines * 24), textAlignVertical: 'top' }}
                                >
                                </TextInput>
                            </View>
                            {rightIcon && <CustomPressIcon {...rightIcon} />}
                        </View>
                        {
                            fieldState.error?.message &&
                            <Text className='text-red-700'>
                                {fieldState.error?.message}
                            </Text>
                        }
                    </View>
                )
            }}
        />
    )
}

export default CustomInput