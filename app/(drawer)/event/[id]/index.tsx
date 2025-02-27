import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import NavHeader from '@/components/navHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Event as GroupEvent } from '@/model/api/event'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import GroupMemberList from '@/components/groupMemberList'
import { images } from '@/constants'
import ExpandableIcon from '@/components/buttons/expandableIcon'
import { useEvent } from '@/context/EventContext'
import LoadingIndicator from '@/components/loadingIndicator'
import Toast from 'react-native-toast-message';

const EventsDetail = () => {
  const { eventState, getEvent, isLoading, error } = useEvent()

  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const mapRef = React.useRef<MapView>(null)

  const groupMemberListMemo = useMemo(() => {
    return <GroupMemberList members={eventState?.group?.groupMembers} separator />
  }, [eventState])

  useEffect(() => {
    const getEventAsync = async () => {
      if (getEvent)
        await getEvent(Number.parseInt(id))
    }
    getEventAsync()
  }, [])

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error) {
    router.dismissTo('/event')
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: error,
    })
    return
  }

  return (
    <>
      <NavHeader title={eventState?.group?.name} iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo('/event') }} className={'bg-secondary'} />
      <ScrollView overScrollMode='never' persistentScrollbar showsVerticalScrollIndicator className='flex-1'>
        <SafeAreaView className='p-4'>
          <View className='w-full h-[33vh]'>
            <Image source={images.staticMapExample} className='w-full h-full object-cover' />
          </View>
        </SafeAreaView>
        {groupMemberListMemo}
      </ScrollView>
      <ExpandableIcon menuItems={[
        {
          icon: 'list',
          label: 'Times',
          onPress: () => {
            router.push(`/event/${id}/teams`)
          }
        },
        {
          icon: 'play',
          label: 'Iniciar',
          onPress: () => {
            router.push(`/event/${id}/match`)
          }
        }
      ]} />
    </>
  )
}

export default EventsDetail