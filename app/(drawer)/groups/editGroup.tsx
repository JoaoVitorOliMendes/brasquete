import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import NavHeader from '@/components/navHeader'
import CustomTitle from '@/components/customTitle'
import CustomInput from '@/components/customInput'
import { TextInput } from 'react-native-gesture-handler'
import { useForm } from 'react-hook-form'
import { Group, Location } from '@/model/api'
import CustomButton from '@/components/customButton'
import CustomDropdown from '@/components/customDropdown'
import MapPickerModal from '@/components/mapPickerModal'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import CustomStarRating from '@/components/customStarRating'
import CustomControlCheckbox from '@/components/customControlCheckbox'

const EditGroup = () => {
    const [coordsMatch, setCoordsMatch] = useState(false)
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    const { control, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<Group>()

    const watchLocationCity = watch('location.city')
    const watchLocationCountry = watch('location.country')
    const watchLocationNeighborhood = watch('location.neighborhood')
    const watchLocationStreet = watch('location.street')
    const watchLocationStreetNumber = watch('location.streetNumber')
    const watchLocationState = watch('location.state')
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
            setValue('id', Number.parseInt(id))
            setValue('isPublic', true)
            setValue('level', 3)
            setValue('name', 'TEST')
            setValue('location.city', 'TEST')
            setValue('location.country', 'TEST')
            setValue('location.neighborhood', 'TEST')
            setValue('location.street', 'TEST')
            setValue('location.state', 'TEST')
            setValue('location.streetNumber', 'TEST')
            setValue('location.coordsMatch', false)
        }
    }, [])

    useEffect(() => {
        if (coordsMatch)
            setCoordsMatch(false)
        else
            setValue('location.coordsMatch', false)
    }, [watchLocationCity, watchLocationCountry, watchLocationNeighborhood, watchLocationStreet, watchLocationStreetNumber, watchLocationState])

    const handleRegister = (data: Group) => {
        console.log(data)
    }

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className='h-full'>
                {router.canGoBack() && <NavHeader iconProps={{ color: 'white', icon: 'arrow-back', onPress: () => router.back() }} title={id ? 'Editar Grupo' : 'Novo Grupo'} className={'bg-secondary py-2'} />}
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
                            <CustomInput
                                color='black'
                                type='outline'
                                inputRef={descriptionRef}
                                formProps={{
                                    control,
                                    name: 'description'
                                }}
                                inputProps={{
                                    placeholder: 'Descrição',
                                    returnKeyType: 'none'
                                }}
                                className='basis-full mb-4'
                                multiline
                                numberOfLines={5}
                            />
                            <CustomControlCheckbox
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
                                    name: 'location.streetNumber'
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
                                latitude={getValues().location?.coordsMatch ? getValues().location?.latitude : undefined}
                                longitude={getValues().location?.coordsMatch ? getValues().location?.longitude : undefined}
                                onChange={() => setCoordsMatch(true)}
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