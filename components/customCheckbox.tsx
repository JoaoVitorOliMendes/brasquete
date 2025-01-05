import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { ClassColor } from '@/model/ClassTypeColor';
import { Ionicons } from '@expo/vector-icons';

interface CustomCheckboxProps<FormType extends FieldValues> {
    formProps: UseControllerProps<FormType>,
    color?: keyof ClassColor,
    className?: string,
    label: string,
    size?: number
}

const CustomCheckbox = <FormType extends FieldValues,>({ formProps, color, className = '', label, size = 24 }: CustomCheckboxProps<FormType>) => {
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
                                className='border-solid border-2 rounded mr-5'
                            >
                                {
                                    field.value ?
                                        <Ionicons name='checkmark' className='p-0' size={size} />
                                        :
                                        <View style={{ width: size, height: size }} />
                                }
                            </TouchableOpacity>
                            <Text>
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

export default CustomCheckbox