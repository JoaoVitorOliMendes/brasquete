import { View, Text, Modal, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import CustomPressIcon from '../buttons/customPressIcon'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { colors, images } from '@/constants'
import CustomButton from '../buttons/customButton'
import CustomInput from '../forms/customInput'
import { useFieldArray, useForm } from 'react-hook-form';
import PlayerCard from '../card/playerCard'
import IconConcat from '../iconConcat'
import CustomTitle from '../customTitle'
import { FullWindowOverlay } from 'react-native-screens'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { GroupEvent, GroupMember, Player, Team } from '@/model/models'
import Toast from 'react-native-toast-message'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTeam, insertTeam, updateTeam } from '@/api/teamApi'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { getPlayersForEvent } from '@/api/playerApi'
import { useLocalSearchParams } from 'expo-router'

interface TeamPickerModalProps {
    visible?: boolean,
    dismiss: () => void,
    eventsData: GroupEvent,
    team?: Team
}

const TeamPickerModal = ({ visible, dismiss, eventsData, team }: TeamPickerModalProps) => {
    const { id: eventId } = useLocalSearchParams<{ id: string }>();
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const snapPoints = useMemo(() => ['50%'], [])
    const { control, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm<Team>()
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'player',
    });

    const [availablePlayers, setAvailablePlayers] = useState<GroupMember[]>()
    const { data: playerData } = useQuery(['player', eventsData.id], () => getPlayersForEvent(eventsData))
    const insertTeamMutation = useMutation(insertTeam)
    const updateTeamMutation = useMutation(updateTeam)
    const deleteTeamMutation = useMutation(deleteTeam)
    const queryClient = useQueryClient()

    const availablePlayersMemo = useMemo(() => {
        if (availablePlayers) {
            return availablePlayers.map((item, idx) => {
                return (
                    <TouchableOpacity activeOpacity={0.5} key={idx} onPress={() => {
                        const createdPlayerIdx = fields.findIndex((player) => player.group_member_id === item.id)
                        if (fields[createdPlayerIdx]) {
                            update(createdPlayerIdx, {
                                ...fields[createdPlayerIdx],
                                status: 0
                            })
                        } else {
                            append({
                                group_member_id: item.id,
                                status: 0
                            } as Player)
                        }
                        setAvailablePlayers(availablePlayers.slice(0, idx).concat(availablePlayers.slice(idx + 1)))
                        bottomSheetRef.current?.close()
                    }}>
                        <PlayerCard player={{
                            group_member: item
                        } as Player} className={idx % 2 == 0 ? 'bg-gray-400' : 'bg-gray-300'} />
                    </TouchableOpacity>
                )
            })
        }
    }, [availablePlayers])

    const teamNameRef = useRef<TextInput>(null)


    useEffect(() => {
        setAvailablePlayers(eventsData?.groups?.group_member?.filter((member) => member.confirmed === 1 && !(playerData?.find((player) => player.group_member_id === member.id && player.status === 0))))
        setValue('event_id', eventsData.id)
    }, [visible])

    useEffect(() => {
        if (team) {
            reset({
                id: team.id,
                name: team.name,
                player: team.player,
                event_id: eventId
            })
        } else {
            reset({
                id: '',
                name: '',
                player: [],
                event_id: eventId
            })
        }
    }, [team, reset])

    const handleSave = async (data: Team) => {
        if (team) {
            const response = await updateTeamMutation.mutateAsync(data)
        } else {
            const { id, ...otherProps } = data
            const response = await insertTeamMutation.mutateAsync(otherProps as Team)
        }
        queryClient.invalidateQueries(['events', eventsData.id])
        queryClient.invalidateQueries(['teams', eventsData.id])
        dismiss()
    }

    const handleDelete = async (data: Team) => {
        await deleteTeamMutation.mutateAsync(data);
        queryClient.invalidateQueries(['events', eventsData.id])
        queryClient.invalidateQueries(['teams', eventsData.id])
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
                                {availablePlayersMemo}
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
                                    <View className='basis-full justify-between flex-row-reverse mb-5'>
                                        <CustomPressIcon iconProps={{ icon: 'save', color: 'white' }} onPress={handleSubmit(handleSave)} />
                                        {
                                            team &&
                                            <CustomPressIcon iconProps={{ icon: 'delete', color: 'primary' }} onPress={handleSubmit(handleDelete)} />
                                        }
                                    </View>
                                    <CustomInput
                                        formProps={{
                                            control,
                                            name: 'name',
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
                                                fields.filter((item) => item.status == 0).map((item, idx) => {
                                                    const playerEvent = eventsData?.groups?.group_member?.filter((member) => member.id === item.group_member_id)
                                                    return (
                                                        <PlayerCard player={{
                                                            ...item,
                                                            group_member: playerEvent ? playerEvent[0] : undefined
                                                        }} key={idx} className={idx % 2 == 0 ? 'bg-gray-400' : 'bg-gray-300'} onIconPress={() => {
                                                            update(idx, {
                                                                ...item,
                                                                status: 1
                                                            })
                                                            setAvailablePlayers([...availablePlayers || [], ...playerEvent || []])
                                                        }} />
                                                    )
                                                })
                                            }
                                            <TouchableOpacity className='p-4 flex flex-row flex-wrap items-center justify-center' onPress={() => {
                                                if (availablePlayers?.length) {
                                                    bottomSheetRef.current?.present()
                                                } else {
                                                    Toast.show({ type: 'info', text1: 'Sem jogadores restantes', text2: 'Todos os membros confirmados foram selecionados' })
                                                }
                                            }}>
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