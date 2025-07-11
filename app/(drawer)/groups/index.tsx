import { View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { router, useRouter } from 'expo-router'
import CardGroup from '@/components/card/cardGroup'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExpandableIcon from '@/components/buttons/expandableIcon'
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus'
import { useQuery } from '@tanstack/react-query'
import { getGroupsForUser } from '@/api/groupsApi'
import { fetchUser } from '@/api/authApi'
import Toast from 'react-native-toast-message'
import CustomTitle from '@/components/customTitle'
import IconConcat from '@/components/iconConcat'

const GroupsIndex = () => {
  const router = useRouter()

  const { data: user, isLoading } = useQuery(['user'], fetchUser)

  const userId = user?.id

  const { data: groupsData, refetch } = useQuery(['groups', userId], () => getGroupsForUser(userId), {
    enabled: !!userId
  })

  useRefreshOnFocus(refetch)

  if (isLoading)
    return <></>

  if (!isLoading && !user) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'No User Found' })
    router.dismissTo('/event')
  }

  return (
    <SafeAreaView className='flex-1 relative'>
      <CustomDrawerHeader title='Meus Grupos' />
      <ScrollView>
        <View className='p-4'>
          {/* <CustomTitle title='Meus Grupos' sizeClass='text-4xl' className='mb-4' /> */}
          {
            (groupsData && groupsData.length) ?
              groupsData.map((item) => {
                return <CardGroup group={item} key={item.id} />
              })
              :
              <View
                className='flex-row justify-center align-center opacity-50 mt-20 px-20'
              >
                <CustomTitle
                  title='Você ainda não ingressou em nenhum grupo'
                  sizeClass='text-2xl'
                  className='text-center'
                />
                <IconConcat icon='basketball-outline' className='ml-4' />
              </View>
          }
        </View>
      </ScrollView>
      <ExpandableIcon menuItems={[
        {
          icon: 'add',
          label: 'Criar Grupo',
          onPress: () => {
            router.push('/groups/editGroup')
          }
        }
      ]} />
    </SafeAreaView>
  )
}

export default GroupsIndex