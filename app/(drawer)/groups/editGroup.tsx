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
import { Groups } from '@/model/models'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getGroupsById, insertGroup, updateGroup } from '@/api/groupsApi'
import { fetchUser } from '@/api/authApi'
import { insertLocation, updateLocation } from '@/api/locationApi'

const EditGroup = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()
    const updateGroupMutation = useMutation(updateGroup)
    const insertGroupMutation = useMutation(insertGroup)
    const updateLocationMutation = useMutation(updateLocation)
    const insertLocationMutation = useMutation(insertLocation)
    
    const { data: user, isLoading: userIsLoading } = useQuery(['user'], fetchUser)

    if (id) {
        useQuery(['groups', id], () => getGroupsById(id), {
            onSuccess(data) {
                if (data) {
                    setValue('id', data.id)
                    setValue('private', data.private)
                    setValue('level', data.level)
                    setValue('name', data.name)
                    setValue('location_id', data.location_id)
                    if (data.location) {
                        setValue('location.add_city', data.location.add_city)
                        setValue('location.add_country', data.location.add_country)
                        setValue('location.add_neighborhood', data.location.add_neighborhood)
                        setValue('location.add_number', data.location.add_number)
                        setValue('location.add_state', data.location.add_state)
                        setValue('location.add_street', data.location.add_street)
                        setValue('location.longitude', data.location.longitude)
                        setValue('location.latitude', data.location.latitude)
                        setValue('location.id', data.location.id)
                    }
                }
            },
        })
    }
    const { control, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<Groups>()

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

    const handleRegister = async (data: Groups) => {
        const locationObj = data.location
        delete data.location
        console.log(data)
        if (locationObj &&
            locationObj.add_city &&
            locationObj.add_country &&
            locationObj.add_neighborhood &&
            locationObj.add_number &&
            locationObj.add_state &&
            locationObj.add_street
        ) {
            if (data.location_id) {
                locationObj.id = data.location_id
                console.log(locationObj)
                await updateLocationMutation.mutateAsync(locationObj)
            } else {
                console.log(locationObj)
                await insertLocationMutation.mutateAsync(locationObj).then((val) => {
                    if (val) {
                        data.location_id=val[0].id
                    }
                })
            }
        }
        if (id)
            await updateGroupMutation.mutateAsync(data)
        else {
            data.admin_id = user!.id
            await insertGroupMutation.mutateAsync(data)
        }
        router.dismissTo('/groups')
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
                                label='Privado?'
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
                                onChange={() => console.log('Change')}
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