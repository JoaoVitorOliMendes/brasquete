import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import NavHeader from '@/components/navHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import GroupMemberList from '@/components/groupMemberList'
import { images } from '@/constants'
import ExpandableIcon from '@/components/buttons/expandableIcon'
import Toast from 'react-native-toast-message';
import useGetEventsForUser from '@/api/eventsApi'

const EventsDetail = () => {
  const { data: eventsData, isLoading } = useGetEventsForUser()
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const mapRef = React.useRef<MapView>(null)

  const groupMemberListMemo = useMemo(() => {
    return <GroupMemberList members={eventsData?.group?.groupMembers} separator />
  }, [eventsData])

  return (
    <>
      <NavHeader title={eventsData?.group?.name} iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo('/event') }} className={'bg-secondary'} />
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