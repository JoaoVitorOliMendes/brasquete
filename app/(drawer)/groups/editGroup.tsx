import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import NavHeader from '@/components/navHeader'
import CustomTitle from '@/components/customTitle'
import CustomInput from '@/components/customInput'
import { TextInput } from 'react-native-gesture-handler'
import { useForm } from 'react-hook-form'
import { Group } from '@/model/api'
import CustomCheckbox from '@/components/customCheckbox'
import CustomButton from '@/components/customButton'
import CustomDropdown from '@/components/customDropdown'
import MapPickerModal from '@/components/mapPickerModal'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const EditGroup = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm<Group>()
    const nameRef = useRef<TextInput>(null)
    const bottomSheetRef = useRef<BottomSheetModal>(null)

    useEffect(() => {
        if (!id) {
            setValue('id', Number.parseInt(id))
            setValue('name', 'kkdscl')
        }
    }, [])

    const handleRegister = (data: Group) => {
        console.log(data)
    }

    return (
        <SafeAreaView className='h-full'>
            <BottomSheetModalProvider>
                {router.canGoBack() && <NavHeader iconProps={{ color: 'white', icon: 'arrow-back', onPress: () => router.back() }} className={'bg-secondary py-2'} />}
                <ScrollView nestedScrollEnabled={true}>
                    <View className='p-5'>
                        <CustomTitle color='black' title='Novo Grupo' />
                        <View className='mt-10'>
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={nameRef}
                                formProps={{
                                    control,
                                    name: 'name',
                                    rules: {
                                        required: 'Nome é obrigatório'
                                    }
                                }}
                                inputProps={{
                                    placeholder: 'Nome',
                                    onSubmitEditing: () => console.log,
                                    returnKeyType: 'next'
                                }}
                                className='mb-4'
                            />
                            <CustomCheckbox
                                formProps={{
                                    control,
                                    name: 'isPublic'
                                }}
                                label='Público?'
                                className='mb-4'
                            />
                            <CustomButton label='Selecionar Localização' color='primary' type='outline' className='mb-4' onPress={() => bottomSheetRef.current?.present()} />
                            <MapPickerModal
                                bottomSheetRef={bottomSheetRef}
                                formProps={{
                                    control,
                                    name: 'location'
                                }}
                            />
                            <CustomButton label='Criar Novo Grupo' onPress={handleSubmit(handleRegister)} />
                        </View>
                    </View>
                </ScrollView>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}

export default EditGroup