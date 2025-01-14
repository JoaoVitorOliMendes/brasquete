import { View, Text, ScrollView, Image } from 'react-native'
import React, { useMemo } from 'react'
import NavHeader from '@/components/navHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Event as GroupEvent } from '@/model/api/event'
import { useLocalSearchParams, useRouter } from 'expo-router'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import GroupMemberList from '@/components/groupMemberList'
import { images } from '@/constants'
import ExpandableIcon from '@/components/buttons/expandableIcon'

const EventsDetail = () => {
  const event: GroupEvent = {
    id: 1,
    date: new Date(),
    group: {
      id: 1,
      admin: {
        id: 1,
        name: 'João'
      },
      location: {
        city: 'Belo Horizonte',
        country: 'BR',
        latitude: -19.93634456787944,
        longitude: -43.96623943001032,
        neighborhood: 'Grajaú',
        state: 'Minas Gerais',
        street: 'Rua Santa Cruz',
        streetNumber: '560',
        coordsMatch: true
      },
      level: 3,
      name: 'Grupo 1',
      groupMembers: [
        {
          id: 0,
          confirmed: 'confirmed',
          position: 'Ala',
          userId: 0,
          user: {
            id: 0,
            name: 'João'
          }
        },
        {
          id: 1,
          confirmed: 'confirmed',
          position: 'Pivo',
          userId: 0,
          user: {
            id: 1,
            name: 'Jamir'
          }
        },
        {
          id: 2,
          confirmed: 'absent',
          position: 'Armador',
          userId: 0,
          user: {
            id: 2,
            name: 'Diego'
          }
        },
        {
          id: 3,
          confirmed: 'deciding',
          position: 'Ala',
          userId: 0,
          user: {
            id: 3,
            name: 'Alberto'
          }
        }
      ],
    }
  }

  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const mapRef = React.useRef<MapView>(null)


  const groupMemberListMemo = useMemo(() => {
    return <GroupMemberList members={event.group?.groupMembers} separator />
  }, [event])


  return (
    <>
      <NavHeader title={event.group?.name} iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.dismissTo('/event') }} className={'bg-secondary'} />
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