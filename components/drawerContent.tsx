import { View, Image, ScrollView } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { images } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import DrawerLink from './drawerLink'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const DrawerContent = ({ descriptors, navigation, state }: DrawerContentComponentProps) => {
  const router = useRouter()
  return (
    <View className='flex-1 bg-primary'>
      <SafeAreaView className='p-5 flex flex-column items-center'>
        <Image
          className='rounded-full w-48 h-48 my-5 mb-20'
          source={images.person}
        />
        <ScrollView className='w-full'>
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
            onPress={() => router.replace('/')}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default DrawerContent