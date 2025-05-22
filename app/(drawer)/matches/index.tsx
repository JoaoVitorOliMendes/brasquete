import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTitle from '@/components/customTitle'
import CardMatch from '@/components/card/cardMatch'
import CardGroup from '@/components/card/cardGroup'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '@/api/authApi'
import Toast from 'react-native-toast-message'
import { getClosedMatchesForUser } from '@/api/matchApi'
import IconConcat from '@/components/iconConcat'

const MatchesIndex = () => {
  const router = useRouter()
  const { data: user, isLoading: userIsLoading } = useQuery(['user'], fetchUser)
  const { data: closedMatches, isLoading: matchIsLoading } = useQuery(['matches', 'closed', user?.id], () => getClosedMatchesForUser(user), {
    enabled: !!user
  })

  if (userIsLoading || matchIsLoading)
    return <></>

  if (!(userIsLoading || matchIsLoading) && !user && !closedMatches) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'No User Found' })
    router.dismissTo('/event')
  }

  return (
    <View>
      <CustomDrawerHeader title='Partidas' />
      <View className='p-4'>
        {
          (closedMatches && closedMatches.length) ?
            closedMatches?.map((match, index) => {
              return (
                <CardMatch key={index} match={match} />
              )
            })

            :
            <View
              className='flex-row justify-center align-center opacity-50 mt-20'
            >
              <CustomTitle
                title='Sem partidas jogadas'
                sizeClass='text-2xl'
              />
              <IconConcat icon='basketball-outline' className='ml-4' />
            </View>
        }
      </View>
    </View>
  )
}

export default MatchesIndex