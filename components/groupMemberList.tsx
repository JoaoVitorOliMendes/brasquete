import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { colors, images } from '@/constants'
import CustomTitle from './customTitle'
import CustomPressIcon from './buttons/customPressIcon'
import ReportMemberModal from './modals/reportMemberModal'
import CustomButton from './buttons/customButton'
import { GroupMember, Groups } from '@/model/models'
import { Share } from 'react-native';
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message'
import ConfirmModal from './modals/confirmationModal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteGroupMember, insertGroupMember } from '@/api/groupMemberApi'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { fetchUser } from '@/api/authApi'

interface GroupMemberListProps {
    members?: Groups,
    separator?: boolean,
    admin: boolean,
    addMemberBtn?: boolean
}

const separatorLabels: { [K in Exclude<GroupMember['confirmed'], null | undefined>]: string } = {
    0: 'Em decisão',
    1: 'Confirmado',
    2: 'Não Vai'
}

const separatorColors: { [K in Exclude<GroupMember['confirmed'], null | undefined>]: string } = {
    0: 'bg-amber-700',
    1: 'bg-emerald-700',
    2: 'bg-red-700'
}

const GroupMemberList = ({ members, separator = false, admin, addMemberBtn = true }: GroupMemberListProps) => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const [modalVisible, setModalVisible] = useState(false)
    const [removeMemberConfirmModalVisible, setRemoveMemberConfirmModalVisible] = useState(false)
    const [focusMember, setFocusMember] = useState<GroupMember>()
    const removeMemberMutation = useMutation(deleteGroupMember)
    const joinGroupMutation = useMutation(insertGroupMember)
    const queryClient = useQueryClient()

    const { data: user, isLoading } = useQuery(['user'], fetchUser)
    const router = useRouter()

    const isMember = !!(members?.group_member?.find((item) => item.user_id == user?.id))

    const groupAdminMember = members?.group_member?.find((item) => members.admin_id == item.user_id)

    var filteredMembers: GroupMember[] = []

    if (groupAdminMember) {
        const filteredArray = members?.group_member?.filter(item => members.admin_id != item.user_id)
        filteredMembers = [groupAdminMember, ...filteredArray || []];
    }

    // Fkin mess
    // But i liked it
    const groupedArray = filteredMembers.reduce<{ [key: number]: GroupMember[] }>((obj, item) => {
        (obj[item.confirmed] = obj[item.confirmed] || []).push(item)
        return obj
    }, {})

    const mapGroups = (separator?: any | undefined) => {
        const arr = !!separator ? groupedArray![separator] : ([] as GroupMember[]).concat.apply([], Object.values(groupedArray!))
        return arr.map((item) => {
            return (
                <View className='flex flex-row' key={item.id}>
                    {/* I'm the fking best dude */}
                    < View className='basis-3/12 flex items-center justify-center p-5' >
                        <Image
                            className='rounded-full'
                            style={{ width: '100%', height: 'auto', aspectRatio: 1 / 1 }}
                            source={images.person}
                        />
                    </View >
                    <View className='basis-6/12 flex flex-column justify-center px-4'>
                        <CustomTitle title={item.profiles ? item.profiles.first_name + ' ' + item.profiles.last_name : ''} sizeClass='text-xl' />
                        <CustomTitle title={item.profiles?.position || ''} sizeClass='text-xl' />
                    </View>
                    <View className='basis-3/12 flex flex-column justify-center items-center p-4'>
                        {
                            (item.profiles?.id != members?.admin_id) ?
                                (
                                    <>
                                        {
                                            separator ?
                                                <View className={`rounded-full mb-4 ${separatorColors[item.confirmed]}`} style={{ width: '33%', height: 'auto', aspectRatio: 1 / 1 }} />
                                                :
                                                <View className='flex flex-row flex-wrap'>
                                                    {
                                                        (item.profiles?.id != user?.id) &&
                                                        <CustomPressIcon iconProps={{ icon: 'flag-outline' }} onPress={() => setModalVisible(true)} />
                                                    }

                                                    {
                                                        (admin || item.profiles?.id == user?.id) &&
                                                        <CustomPressIcon iconProps={{ icon: 'close' }} onPress={() => removeMember(item)} />
                                                    }
                                                </View>
                                        }
                                    </>
                                )
                                :
                                <View className='rounded-full bg-primary justify-center align-center' style={{ width: '85%', height: 'auto', aspectRatio: 1 / 1 }}>
                                    <Text className='text-center'>
                                        Admin
                                    </Text>
                                </View>
                        }
                    </View>
                </View>
            )
        })
    }

    const inviteMembers = () => {
        if (members) {
            const link = Linking.createURL(`/groups/${members.id}`);
            Share.share({
                title: 'Compartilhar Grupo',
                message: link,
                url: link
            })
        } else
            Toast.show({ type: 'error', text1: 'Error', text2: 'No URL Found' })
    }

    const removeMember = (groupMember: GroupMember) => {
        setFocusMember(groupMember)
        setRemoveMemberConfirmModalVisible(true)
    }

    const joinGroup = async () => {
        if (members && user) {
            const resp = await joinGroupMutation.mutateAsync({
                group_id: members.id,
                user_id: user?.id
            } as GroupMember)
            if (resp) {
                queryClient.invalidateQueries(['groups', id])
                Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Você agora faz parte do grupo' })
            }
        } else
            Toast.show({ type: 'error', text1: 'Error', text2: 'No Member or User' })
    }

    const removeMemberConfirmModalMemo = useMemo(() => {
        const message = focusMember?.profiles?.id == user?.id ? 'Você tem certeza que deseja sair do grupo?' : `Você tem certeza que deseja remover o usuário ${focusMember?.profiles?.first_name + ' ' + focusMember?.profiles?.last_name} do grupo?`
        return <ConfirmModal message={message} title='Remover usuário' onConfirm={() => {
            removeMemberMutation.mutateAsync(focusMember!).then((val) => {
                queryClient.invalidateQueries(['groups', id])
                setRemoveMemberConfirmModalVisible(false)
            })
        }} visible={removeMemberConfirmModalVisible} dismiss={() => setRemoveMemberConfirmModalVisible(false)} />
    }, [removeMemberConfirmModalVisible, focusMember])

    const reportMemberModalMemo = useMemo(() => {
        return <ReportMemberModal visible={modalVisible} dismiss={() => setModalVisible(false)} />
    }, [modalVisible])

    

    return (
        <View className='flex flex-row justify-center flex-wrap bg-white p-4'>
            {
                addMemberBtn &&
                (
                    admin ?
                        <CustomButton label='Adicionar membros' color='secondary' className='w-1/2' onPress={inviteMembers} />
                        :
                        !isMember ?
                            <CustomButton label='Entrar no grupo' color='primary' className='w-1/2' onPress={joinGroup} />
                            :
                            <></>
                )
            }
            {
                groupedArray &&
                (
                    separator ?
                        Object.keys(groupedArray).sort((a, b) => {
                            if (a == "1") {
                                return -1
                            }
                            return 1
                        }).map((item, idx) => {
                            return (
                                <View key={idx}>
                                    <CustomTitle title={separatorLabels[Number(item)]} sizeClass='text-3xl' className='basis-full' />
                                    {
                                        mapGroups(item)
                                    }
                                </View>
                            )
                        })
                        :
                        mapGroups()
                )
            }
            {reportMemberModalMemo}
            {removeMemberConfirmModalMemo}
        </View>
    )
}

export default GroupMemberList