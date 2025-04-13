import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import NavHeader from '@/components/navHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import GroupMemberList from '@/components/groupMemberList'
import { images } from '@/constants'
import ExpandableIcon, { MenuItem } from '@/components/buttons/expandableIcon'
import Toast from 'react-native-toast-message';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeEventStatus, getEventByid } from '@/api/eventsApi'
import { fetchUser } from '@/api/authApi'
import CustomTitle from '@/components/customTitle'
import { changeStatusGroupMember } from '@/api/groupMemberApi'
import { GroupEvent, GroupMember } from '@/model/models'

const EventsDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: user } = useQuery(['user'], fetchUser)
  const { data: eventsData, isLoading: eventsLoading } = useQuery(['events', id], () => getEventByid(id))

  const changeStatusGMMutation = useMutation(changeStatusGroupMember)
  const changeStatusEVMutation = useMutation(changeEventStatus)

  const userMember = (eventsData?.groups?.group_member?.find((item) => item.user_id == user?.id))

  const groupMemberListMemo = useMemo(() => {
    if (eventsData)
      return <GroupMemberList addMemberBtn={false} members={eventsData.groups} separator admin={!!(eventsData.groups && (user?.id == eventsData.groups.admin_id))} />
    return <></>
  }, [eventsData])

  const extendedMenu: MenuItem[] = useMemo(() => {
    
    
    if (user?.id == eventsData?.groups?.admin_id) {
      if (eventsData?.status == 1) {
        return [
          {
            icon: 'list',
            label: 'Times',
            onPress: () => {
              router.push(`/event/${id}/teams`)
            }
          }
        ]
      } else {
        return [
          {
            icon: 'play',
            label: 'Iniciar',
            onPress: async () => {
              
              changeStatusEVMutation.mutateAsync({
                id: eventsData?.id,
                status: 1
              } as GroupEvent)
              queryClient.invalidateQueries(['events', id])
            }
          }
        ]
      }
    } else {
      if (userMember?.confirmed != 1) {
        return [
          {
            icon: 'thumbs-up-outline',
            label: 'Confirmar Presença',
            onPress: async () => {
              await changeStatusGMMutation.mutateAsync({
                confirmed: 1,
                id: userMember?.id
              } as GroupMember).then((val) => {
                queryClient.invalidateQueries(['events', id])
              })
            }
          }
        ]
      } else {
        return [
          {
            icon: 'thumbs-down-outline',
            label: 'Indicar Ausência',
            onPress: async () => {
              await changeStatusGMMutation.mutateAsync({
                confirmed: 2,
                id: userMember?.id
              } as GroupMember).then((val) => {
                queryClient.invalidateQueries(['events', id])
              })
            }
          }
        ]
      }
    }
  }, [eventsData])

  if (eventsLoading)
    return <></>

  if (!eventsLoading && !(eventsData && eventsData.groups)) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'No Event Found' })
    router.dismissTo('/event')
  }

  return (
    <>
      <NavHeader title={eventsData?.groups?.name} iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo('/event') }} className={'bg-secondary'} />
      <ScrollView overScrollMode='never' persistentScrollbar showsVerticalScrollIndicator className='flex-1'>
        <SafeAreaView className='p-4'>
          <View className='w-full h-[33vh]'>
            <Image source={images.staticMapExample} className='w-full h-full object-cover' />
          </View>
          <View>
            <CustomTitle
              title={`${('0' + (eventsData?.date?.getDate() || 0).toString()).slice(-2)}/${('0' + ((eventsData?.date?.getMonth() || 0) + 1).toString()).slice(-2)}/${eventsData?.date?.getFullYear().toString().slice(-2)} ${('0' + (eventsData?.date?.getHours() || 0).toString()).slice(-2)}:${('0' + (eventsData?.date?.getMinutes() || 0).toString()).slice(-2)}`}
              sizeClass='text-3xl'
              className='text-center p-2 bg-primary m-4 rounded-full'
            />
          </View>
        </SafeAreaView>
        {groupMemberListMemo}
      </ScrollView>
      {
        <ExpandableIcon menuItems={extendedMenu} />
      }
    </>
  )
}

export default EventsDetail