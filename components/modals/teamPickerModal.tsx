import { View, Text, Modal, Image, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useMemo, useRef } from 'react'
import CustomPressIcon from '../buttons/customPressIcon'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useEvent } from '@/context/EventContext'
import { images } from '@/constants'
import CustomButton from '../buttons/customButton'
import CustomInput from '../forms/customInput'
import { useFieldArray, useForm } from 'react-hook-form';
import { Team } from '@/model/api'
import PlayerCard from '../card/playerCard'
import IconConcat from '../iconConcat'
import CustomTitle from '../customTitle'

interface TeamPickerModalProps {
    visible?: boolean,
    dismiss?: () => void
}

const TeamPickerModal = ({ visible, dismiss, }: TeamPickerModalProps) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const snapPoints = useMemo(() => ['95%'], [])
    const { eventState, getEvent, isLoading } = useEvent()
    const { control, handleSubmit, formState: { errors } } = useForm<Team>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'players',
    });

    const teamNameRef = useRef<TextInput>(null)

    return (
        <>
            <Modal visible={visible} transparent>
                <View className='relative h-full w-full flex justify-center items-center'>
                    <Pressable
                        onPressOut={dismiss}
                        className='absolute h-full w-full bg-black opacity-25'
                        style={{
                            elevation: 3
                        }}
                    />
                    <BottomSheetModalProvider>
                        <BottomSheetModal
                            style={{
                                elevation: 10
                            }}
                            ref={bottomSheetRef}
                            snapPoints={snapPoints}
                            enablePanDownToClose={true}
                            enableContentPanningGesture={false}
                            backdropComponent={(props) => {
                                return (
                                    <BottomSheetBackdrop onPress={() => console.log('jknsanjkasajknsjnksa')} style={{ elevation: 11 }} opacity={0.1} enableTouchThrough={false} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
                                )
                            }}
                        >
                            <BottomSheetView style={{ elevation: 10 }}>
                                <CustomButton label='dkjnsd' />
                                {
                                    eventState?.group?.groupMembers?.filter((item) => item.confirmed === 'confirmed').map((item, idx) => {
                                        return (
                                            <TouchableOpacity activeOpacity={0.5} key={idx} onPress={() => append(item)}>
                                                <PlayerCard player={item} />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </BottomSheetView>
                        </BottomSheetModal>
                    </BottomSheetModalProvider>
                    <View className='rounded-lg w-5/6 min-h-1/2 bg-secondary p-5'>
                        <View className='flex flex-row flex-wrap justify-center items-center relative'>
                            <View className='basis-full items-end mb-5'>
                                <CustomPressIcon iconProps={{ icon: 'save', color: 'white' }} onPress={console.log} />
                            </View>
                            <CustomInput
                                formProps={{
                                    control,
                                    name: 'teamName',
                                    rules: {
                                        required: 'Nome é obrigatório',
                                    }
                                }}
                                inputProps={{
                                    placeholder: 'Nome do Time',
                                }}
                                inputRef={teamNameRef}
                                type='filled'
                                color='white'
                                className='basis-full mb-10'
                            />
                            <View className='basis-full bg-white rounded-lg'>
                                <ScrollView style={{ flexGrow: 0 }}>
                                    {
                                        fields.map((item, idx) => {
                                            return (
                                                <PlayerCard player={item} key={idx} />
                                            )
                                        })
                                    }
                                    <TouchableOpacity className='p-4 flex flex-row flex-wrap items-center justify-center' onPress={() => {
                                        console.log('Open', bottomSheetRef.current)
                                        bottomSheetRef.current?.present()
                                    }}>
                                        <IconConcat icon='add' />
                                        <CustomTitle title='Adicionar Jogador' color='black' sizeClass='text-xl' />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default TeamPickerModal