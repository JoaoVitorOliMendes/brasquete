import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import { images } from '@/constants'
import { ScrollView } from 'react-native'
import CardStatistics from '@/components/card/cardStatistics'
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '@/api/authApi'
import { getPlayerStatistics } from '@/api/playerScoreApi'
import { useLocalSearchParams, useRouter } from 'expo-router';
import NavHeader from '@/components/navHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stars from '@/components/stars';
import GroupMemberList from '@/components/groupMemberList';
import ExpandableIcon from '@/components/buttons/expandableIcon';
import { deleteGroup, getGroupsById } from '@/api/groupsApi';
import CreateEventModal from '@/components/modals/createEventModal';
import ConfirmModal from '@/components/modals/confirmationModal';
import { Groups } from '@/model/models';

const EditProfile = () => {
  const router = useRouter()
  const { data: user, isLoading } = useQuery(['user'], fetchUser)

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  React.useEffect(() => {
    if (user) {
      setName(user.name || '')
      setBio(user.bio || '')
    }
  }, [user])

  const mutation = useMutation({
    mutationFn: (updatedData: any) => updateUserProfile(updatedData),
    onSuccess: () => {
      router.back() // ou mostrar feedback visual
    }
  })

  const handleSave = () => {
    mutation.mutate({ name, bio })
  }

  return (
    <View>
      <CustomDrawerHeader title='Perfil' />
      <Image
        className='rounded-full !w-48 !h-48 my-5 mb-20 self-center'
        source={images.person}
      />
    </View>
  )
}

export default EditProfile