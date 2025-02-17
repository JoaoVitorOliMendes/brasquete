import { View, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import NavHeader from '@/components/navHeader'
import CustomInput from '@/components/forms/customInput'
import { TextInput } from 'react-native-gesture-handler'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/buttons/customButton'
import MapPickerModal from '@/components/forms/mapPickerModal'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import CustomStarRating from '@/components/forms/customStarRating'
import CustomControlCheckbox from '@/components/forms/customControlCheckbox'
import { Group } from '@/model/models'

const EditGroup = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    const { control, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<Group>()

    const levelState = watch('level')


    const nameRef = useRef<TextInput>(null)
    const locationCityRef = useRef<TextInput>(null)
    const locationCountryRef = useRef<TextInput>(null)
    const locationNeighborhoodRef = useRef<TextInput>(null)
    const locationStreetRef = useRef<TextInput>(null)
    const locationStreetNumberRef = useRef<TextInput>(null)
    const locationStateRef = useRef<TextInput>(null)
    const descriptionRef = useRef<TextInput>(null)
    const bottomSheetRef = useRef<BottomSheetModal>(null)

    useEffect(() => {
        if (id) {
            setValue('id', id)
            setValue('private', false)
            setValue('level', 3)
            setValue('name', 'TEST')
            setValue('location.add_city', 'TEST')
            setValue('location.add_country', 'TEST')
            setValue('location.add_neighborhood', 'TEST')
            setValue('location.add_number', 'TEST')
            setValue('location.add_state', 'TEST')
            setValue('location.add_street', 'TEST')
        }
    }, [])

    const handleRegister = (data: Group) => {
        console.log(data)
    }

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className='h-full'>
                <NavHeader iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo('/groups') }} title={id ? 'Editar Grupo' : 'Novo Grupo'} className={'bg-secondary'} />
                <ScrollView nestedScrollEnabled={true}>
                    <View className='p-5'>
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
                                    onSubmitEditing: () => descriptionRef.current?.focus(),
                                    returnKeyType: 'next'
                                }}
                                className='basis-full mb-4'
                            />
                            <CustomControlCheckbox
                                formProps={{
                                    control,
                                    name: 'private'
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
                                    size: 32,
                                    rating: levelState
                                }}
                            />
                            <CustomButton label='Selecionar Localização' color='primary' type='outline' className='basis-full mb-4' onPress={() => bottomSheetRef.current?.present()} />
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={locationStreetNumberRef}
                                formProps={{
                                    control,
                                    name: 'location.add_number'
                                }}
                                inputProps={{
                                    placeholder: 'Número',
                                    onSubmitEditing: () => locationStreetRef.current?.focus(),
                                    returnKeyType: 'next',
                                }}
                                className='basis-1/2 mb-4 pr-1'
                            />
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={locationStreetRef}
                                formProps={{
                                    control,
                                    name: 'location.add_street'
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
                                    name: 'location.add_neighborhood',
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
                                    name: 'location.add_city'
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
                                    name: 'location.add_state'
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
                                    name: 'location.add_country'
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
                                latitude={getValues().location?.latitude ? getValues().location?.latitude : undefined}
                                longitude={getValues().location?.longitude ? getValues().location?.longitude : undefined}
                            />
                            <CustomButton label='Criar Novo Grupo' onPress={handleSubmit(handleRegister)} className='basis-full' />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </BottomSheetModalProvider>
    )
}

export default EditGroup