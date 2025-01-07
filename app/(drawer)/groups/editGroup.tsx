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
import CustomStarRating from '@/components/customStarRating'

const EditGroup = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm<Group>()
    const nameRef = useRef<TextInput>(null)
    const locationCityRef = useRef<TextInput>(null)
    const locationCountryRef = useRef<TextInput>(null)
    const locationNeighborhoodRef = useRef<TextInput>(null)
    const locationStreetRef = useRef<TextInput>(null)
    const locationStreetNumberRef = useRef<TextInput>(null)
    const locationStateRef = useRef<TextInput>(null)
    const bottomSheetRef = useRef<BottomSheetModal>(null)

    useEffect(() => {
        if (id) {
            setValue('id', Number.parseInt(id))
            setValue('isPublic', false)
            setValue('name', '')
            setValue('location.city', '')
            setValue('location.country', '')
            setValue('location.neighborhood', '')
            setValue('location.street', '')
            setValue('location.streetNumber', '')
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
                        <View className='mt-10 flex flex-row flex-wrap justify-center items-center'>
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
                                    returnKeyType: 'next'
                                }}
                                className='basis-full mb-4'
                            />
                            <CustomCheckbox
                                formProps={{
                                    control,
                                    name: 'isPublic'
                                }}
                                label='Público?'
                                className='basis-full mb-4'
                            />
                            <CustomStarRating
                                formProps={{
                                    control,
                                    name: 'level'
                                }}
                                starProps={{
                                    label: 'Nível do grupo',
                                    className: 'basis-full mb-4',
                                    size: 32
                                }}
                            />
                            <CustomButton label='Selecionar Localização' color='primary' type='outline' className='basis-full mb-4' onPress={() => bottomSheetRef.current?.present()} />
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={locationStreetNumberRef}
                                formProps={{
                                    control,
                                    name: 'location.streetNumber'
                                }}
                                inputProps={{
                                    placeholder: 'Número',
                                    onSubmitEditing: () => locationStreetRef.current?.focus(),
                                    returnKeyType: 'next'
                                }}
                                className='basis-1/2 mb-4 pr-1'
                            />
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={locationStreetRef}
                                formProps={{
                                    control,
                                    name: 'location.street'
                                }}
                                inputProps={{
                                    placeholder: 'Rua',
                                    onSubmitEditing: () => locationNeighborhoodRef.current?.focus(),
                                    returnKeyType: 'next'
                                }}
                                className='basis-1/2 mb-4 pl-1'
                            />
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={locationNeighborhoodRef}
                                formProps={{
                                    control,
                                    name: 'location.neighborhood',
                                }}
                                inputProps={{
                                    placeholder: 'Bairro',
                                    onSubmitEditing: () => locationCityRef.current?.focus(),
                                    returnKeyType: 'next'
                                }}
                                className='basis-1/2 mb-4 pr-1'
                            />
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={locationCityRef}
                                formProps={{
                                    control,
                                    name: 'location.city'
                                }}
                                inputProps={{
                                    placeholder: 'Cidade',
                                    onSubmitEditing: () => locationStateRef.current?.focus(),
                                    returnKeyType: 'next'
                                }}
                                className='basis-1/2 mb-4 pl-1'
                            />
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={locationStateRef}
                                formProps={{
                                    control,
                                    name: 'location.state'
                                }}
                                inputProps={{
                                    placeholder: 'Estado',
                                    onSubmitEditing: () => locationCountryRef.current?.focus(),
                                    returnKeyType: 'next'
                                }}
                                className='basis-1/2 mb-4 pr-1'
                            />
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={locationCountryRef}
                                formProps={{
                                    control,
                                    name: 'location.country'
                                }}
                                inputProps={{
                                    placeholder: 'País',
                                    returnKeyType: 'next'
                                }}
                                className='basis-1/2 mb-4 pl-1'
                            />
                            <MapPickerModal
                                bottomSheetRef={bottomSheetRef}
                                formProps={{
                                    control,
                                    name: 'location'
                                }}
                                setValue={setValue}
                                latitude={getValues().location?.latitude}
                                longitude={getValues().location?.longitude}
                            />
                            <CustomButton label='Criar Novo Grupo' onPress={handleSubmit(handleRegister)} className='basis-full' />
                        </View>
                    </View>
                </ScrollView>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
}

export default EditGroup