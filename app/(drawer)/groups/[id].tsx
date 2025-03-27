import { View, ScrollView, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import NavHeader from '@/components/navHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stars from '@/components/stars';
import GroupMemberList from '@/components/groupMemberList';
import { images } from '@/constants';
import ExpandableIcon from '@/components/buttons/expandableIcon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteGroup, getGroupsById } from '@/api/groupsApi';
import { fetchUser } from '@/api/authApi';
import CreateEventModal from '@/components/modals/createEventModal';
import ConfirmModal from '@/components/modals/confirmationModal';
import { Groups } from '@/model/models';

const GroupsDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const router = useRouter()

    const [modalVisible, setModalVisible] = useState(false)
    const [confirmModalVisible, setConfirmModalVisible] = useState(false)

    const deleteGroupMutation = useMutation(deleteGroup)

    const createEventModalMemo = useMemo(() => {
        return <CreateEventModal groupId={id} visible={modalVisible} dismiss={() => setModalVisible(false)} />
    }, [modalVisible])
    const confirmModalMemo = useMemo(() => {
        return <ConfirmModal message='Você tem certeza que deseja deletar o grupo?' title='Deletar o Grupo' onConfirm={() => {
            deleteGroupMutation.mutateAsync({id: id} as Groups).then((val) => {
                if (val)
                    router.dismissTo('/groups')
            })
        }} visible={confirmModalVisible} dismiss={() => setConfirmModalVisible(false)} />
    }, [confirmModalVisible])
    
    const { data: user, isLoading: userIsLoading } = useQuery(['user'], fetchUser)
    const { data: groupById, isLoading: groupsIsLoading } = useQuery(['groups', id], () => getGroupsById(id), {
        enabled: !!user
    })

    if (userIsLoading || groupsIsLoading || !groupById)
        return <></>

    return (
        <>
            <NavHeader title={groupById.name} iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo('/groups') }} className={'bg-secondary'} />
            <ScrollView overScrollMode='never' persistentScrollbar showsVerticalScrollIndicator className='flex-1'>
                <SafeAreaView className='p-4'>
                    <View className='w-full h-[33vh]'>
                        <Image source={images.staticMapExample} className='w-full h-full object-cover' />
                    </View>
                    <View className='flex flex-row flex-wrap'>
                        {/* <Text className='my-4 basis-full'>
                            {groupById[0].description}
                        </Text> */}
                        <Stars textClassName='text-2xl' label='Nível: ' rating={groupById.level} size={32} className='my-4' disabled />
                    </View>
                </SafeAreaView >
                <GroupMemberList members={groupById} admin={user?.id == groupById.admin_id} />
            </ScrollView>
            {createEventModalMemo}
            {confirmModalMemo}
            {
                (user?.id == groupById.admin_id) &&
                <ExpandableIcon menuItems={[
                    {
                        icon: 'pencil',
                        label: 'Editar Grupo',
                        onPress: () => {
                            router.push({
                                pathname: '/groups/editGroup',
                                params: {
                                    id: id
                                }
                            })
                        }
                    },
                    {
                        icon: 'alarm-outline',
                        label: 'Agendar Evento',
                        onPress: () => {
                            setModalVisible(true)
                        }
                    },
                    {
                        icon: 'trash-bin',
                        label: 'Excluir Grupo',
                        onPress: () => {
                            setConfirmModalVisible(true)
                        }
                    }
                ]} />
            }
        </>
    )
}

export default GroupsDetails