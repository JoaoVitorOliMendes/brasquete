import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { ClassColor } from '@/model/ClassTypeColor';
import { Ionicons } from '@expo/vector-icons';

interface CustomControlCheckboxProps<FormType extends FieldValues> {
    formProps: UseControllerProps<FormType>,
    color?: keyof ClassColor,
    className?: string,
    label: string,
    size?: number
}

const CustomControlCheckbox = <FormType extends FieldValues,>({ formProps, color = 'black', className = '', label, size = 24 }: CustomControlCheckboxProps<FormType>) => {
    const borderColor: ClassColor = {
        white: 'border-white',
        black: 'border-black'
    }

    const textColor: ClassColor = {
        white: 'text-white',
        black: 'text-black'
    }
    return (
        <Controller
            {...formProps}
            render={({ field, fieldState }) => {
                return (
                    <View className={className}>
                        <View className='flex flex-row items-center'>
                            <TouchableOpacity
                                onPress={() => {
                                    field.onChange(!field.value)
                                }}
                                className={`border-solid border-2 rounded mr-5 flex justify-center align-center ${borderColor[color]}`}
                                style={{ width: size + 5, height: size + 5 }}
                            >
                                {
                                    field.value && <Ionicons name='checkmark' className='p-0 text-center' size={size} color={color} />
                                }
                            </TouchableOpacity>
                            <Text className={textColor[color]}>
                                {label}
                            </Text>
                        </View>
                        {
                            fieldState.error?.message &&
                            <Text className='mt-1 text-red-700'>
                                {fieldState.error?.message}
                            </Text>
                        }
                    </View>
                )
            }}
        />
    )
}

export default CustomControlCheckbox