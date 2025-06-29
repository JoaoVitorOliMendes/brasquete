import { View, ScrollView, Image, Text } from 'react-native'
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
import CustomImage from '@/components/customImage';
import { getEventByGroupId } from '@/api/eventsApi';
import CustomTitle from '@/components/customTitle';

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
            deleteGroupMutation.mutateAsync({ id: id } as Groups).then((val) => {
                if (val)
                    router.dismissTo('/groups')
            })
        }} visible={confirmModalVisible} dismiss={() => setConfirmModalVisible(false)} />
    }, [confirmModalVisible])

    const { data: user, isLoading: userIsLoading } = useQuery(['user'], fetchUser)
    const { data: groupById, isLoading: groupsIsLoading } = useQuery(['groups', id], () => getGroupsById(id), {
        enabled: !!user
    })
    const { data: eventGroupById, isLoading: eventGroupsIsLoading } = useQuery(['event', 'groups', id], () => getEventByGroupId(id), {
        enabled: !!groupById
    })

    if (userIsLoading || groupsIsLoading || eventGroupsIsLoading || !groupById)
        return (<></>)

    return (
        <>
            <NavHeader title={groupById.name} iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo('/groups') }} className={'bg-secondary'} />
            <ScrollView overScrollMode='never' persistentScrollbar showsVerticalScrollIndicator className='flex-1'>
                <SafeAreaView className='p-4'>
                    <View className='w-full h-[33vh]'>
                        <CustomImage
                            className='w-full h-full object-cover'
                            altImage={images.map}
                            imageUrl={groupById.location?.location_img || ''}
                            style={null}
                        />
                    </View>
                    <View className='flex flex-row flex-wrap'>
                        {/* <Text className='my-4 basis-full'>
                            {groupById[0].description}
                        </Text> */}
                        <Stars textClassName='text-2xl' label='Nível: ' rating={groupById.level} size={32} className='my-4' disabled />
                    </View>
                    <View className='flex flex-row flex-wrap'>
                        <CustomTitle title={`${groupById.location?.add_number},  ${groupById.location?.add_street}, ${groupById.location?.add_neighborhood}, ${groupById.location?.add_city} - ${groupById.location?.add_state}`} sizeClass='text-xl' className='my-4 basis-full' />
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
                    (eventGroupById?.length && eventGroupById[0]) ?
                    {
                        icon: 'alarm-outline',
                        label: 'Ir para Evento',
                        onPress: () => {
                            router.push(`/event/${eventGroupById[0].id}`)
                        }
                    }
                    :
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