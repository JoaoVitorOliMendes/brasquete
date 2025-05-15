import { View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { images } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import DrawerLink from './drawerLink'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { supabase } from '@/api/supabase'
import CustomImage from '../customImage'
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '@/api/authApi'

const DrawerContent = ({ descriptors, navigation, state }: DrawerContentComponentProps) => {
  const router = useRouter()
  
  const { data: user, isLoading } = useQuery(['user'], fetchUser)

  const logout = async () => {
    await supabase.auth.signOut()
  }
  return (
    <View className='flex-1 bg-primary'>
      <SafeAreaView className='p-5'>
        <ScrollView className='w-full flex flex-column'>
          <TouchableOpacity onPress={() => router.push('/editprofile')}>
            <CustomImage
              className='rounded-full !w-48 !h-48 my-5 mb-20 self-center'
              imageUrl={user?.user_metadata?.profile_img}
              altImage={images.person}
            />
          </TouchableOpacity>
          {
            state.routes.map((val, idx) => {
              const options = descriptors[val.key].options
              const focused = state.index === idx
              const onPress = () => {
                const event = navigation.emit({
                  type: "drawerItemPress",
                  canPreventDefault: true,
                  target: val.key,
                })

                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(val.name, val.params)
                }
              }
              return (
                <DrawerLink key={idx} label={options.title} icon={options.drawerIcon} focused={state.index === idx} onPress={onPress} />
              )
            })
          }
          <DrawerLink
            label={'Exit'}
            icon={() => {
              return (
                <Ionicons
                  name='exit'
                  size={24}
                  color={'#ffffff'}
                />
              )
            }}
            focused={false}
            onPress={logout}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default DrawerContent