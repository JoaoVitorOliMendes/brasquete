import { View, Text, Modal, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef } from 'react'
import CustomPressIcon from '../buttons/customPressIcon'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { useEvent } from '@/context/EventContext'
import { colors, images } from '@/constants'
import CustomButton from '../buttons/customButton'
import CustomInput from '../forms/customInput'
import { useFieldArray, useForm } from 'react-hook-form';
import { Team } from '@/model/api'
import PlayerCard from '../card/playerCard'
import IconConcat from '../iconConcat'
import CustomTitle from '../customTitle'
import { FullWindowOverlay } from 'react-native-screens'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

interface TeamPickerModalProps {
    visible?: boolean,
    dismiss?: () => void
}

const TeamPickerModal = ({ visible, dismiss }: TeamPickerModalProps) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const snapPoints = useMemo(() => ['50%'], [])
    const { eventState, getEvent, isLoading } = useEvent()
    const { control, handleSubmit, formState: { errors } } = useForm<Team>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'players',
    });

    const teamNameRef = useRef<TextInput>(null)


    const handleSave = (data: Team) => {
        console.log(data)
        dismiss()
    }

    return (
        <>
            <Modal visible={visible} transparent>
                <GestureHandlerRootView>
                    <BottomSheetModalProvider>
                        <BottomSheetModal
                            ref={bottomSheetRef}
                            snapPoints={snapPoints}
                            enablePanDownToClose={true}
                            enableContentPanningGesture={false}
                            enableDynamicSizing={false}
                            handleStyle={{
                                backgroundColor: colors.light_gray
                            }}
                            backdropComponent={(props) => {
                                return (
                                    <BottomSheetBackdrop opacity={0.1} enableTouchThrough={false} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
                                )
                            }}
                        >
                            <ScrollView className='bg-gray-300'>
                                {
                                    eventState?.group?.groupMembers?.filter((item) => item.confirmed === 'confirmed').map((item, idx) => {
                                        return (
                                            <TouchableOpacity activeOpacity={0.5} key={idx} onPress={() => {
                                                console.log(item)
                                                append(item)
                                                bottomSheetRef.current?.close()
                                            }}>
                                                <PlayerCard player={item} className={idx % 2 == 0 ? 'bg-gray-400' : 'bg-gray-300'} />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </BottomSheetModal>
                        <View className='relative h-full w-full flex justify-center items-center'>
                            <Pressable
                                onPressOut={dismiss}
                                className='absolute h-full w-full bg-black opacity-25'
                                style={{
                                    elevation: 3
                                }}
                            />
                            <View className='rounded-lg w-5/6 min-h-1/2 bg-secondary p-5'>
                                <View className='flex flex-row flex-wrap justify-center items-center relative'>
                                    <View className='basis-full items-end mb-5'>
                                        <CustomPressIcon iconProps={{ icon: 'save', color: 'white' }} onPress={handleSubmit(handleSave)} />
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
                                    <View className='basis-full bg-white rounded-lg overflow-hidden'>
                                        <ScrollView style={{ flexGrow: 0 }}>
                                            {
                                                fields.map((item, idx) => {
                                                    return (
                                                        <PlayerCard player={item} key={idx} className={idx % 2 == 0 ? 'bg-gray-400' : 'bg-gray-300'} onIconPress={() => remove(idx)} />
                                                    )
                                                })
                                            }
                                            <TouchableOpacity className='p-4 flex flex-row flex-wrap items-center justify-center' onPress={() => bottomSheetRef.current?.present()}>
                                                <IconConcat icon='add' />
                                                <CustomTitle title='Adicionar Jogador' color='black' sizeClass='text-xl' />
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </BottomSheetModalProvider>
                </GestureHandlerRootView>
            </Modal>
        </>
    )
}

export default TeamPickerModal