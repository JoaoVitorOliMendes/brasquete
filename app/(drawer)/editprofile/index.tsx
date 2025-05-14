import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'
import { images } from '@/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUser } from '@/api/authApi'
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form'
import { Profiles } from '@/model/models'
import CustomButton from '@/components/buttons/customButton'
import CustomInput from '@/components/forms/customInput'
import CustomDropdown from '@/components/forms/customDropdown'
import { updateProfile } from '@/api/profileApi'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RegisterForm } from '@/model/RegisterForm'
import CustomImagePicker from '@/components/customImagePicker'

const EditProfile = () => {
  const router = useRouter()
  const [image, setImage] = useState<string>('')
  const queryClient = useQueryClient()
  const { data: user, isLoading } = useQuery(['user'], fetchUser)

  const { control, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<RegisterForm>()

  const nameRef = useRef<TextInput>(null)
  const surnameRef = useRef<TextInput>(null)
  const heightRef = useRef<TextInput>(null)
  const positionRef = useRef<TextInput>(null)

  const updateProfileMutation = useMutation(updateProfile)

  const handleSave = (data: RegisterForm) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(['user']);
      }
    })
  }

  useEffect(() => {
    if (user) {
      setValue('name', user?.user_metadata.first_name)
      setValue('surname', user?.user_metadata.last_name)
      setValue('height', user?.user_metadata.height)
      setValue('position', user?.user_metadata.position)
    }
  }, [user])

  return (
    <SafeAreaView className='h-full'>
      <CustomDrawerHeader title='Perfil' />
      <ScrollView nestedScrollEnabled={true}>
        <View className='p-5'>
          <CustomImagePicker imageUrl={image} setImage={setImage} />
          <View className='mt-10'>
            <CustomInput
              color='black'
              type='outline'
              inputRef={nameRef}
              formProps={{
                control,
                name: 'name',
                rules: {
                  required: 'Nome é obrigatório'
                }
              }}
              inputProps={{
                placeholder: 'Nome',
                onSubmitEditing: () => surnameRef.current?.focus(),
                returnKeyType: 'next'
              }}
              className='mb-4'
            />
            <CustomInput
              color='black'
              type='outline'
              inputRef={surnameRef}
              formProps={{
                control,
                name: 'surname',
                rules: {
                  required: 'Sobrenome é obrigatório'
                }
              }}
              inputProps={{
                placeholder: 'Sobrenome',
                onSubmitEditing: () => heightRef.current?.focus(),
                returnKeyType: 'next'
              }}
              className='mb-4'
            />
            {/* Only show required attributes */}
            <CustomInput
              color='black'
              type='outline'
              inputRef={heightRef}
              formProps={{
                control,
                name: 'height'
              }}
              inputProps={{
                placeholder: 'Altura',
                onSubmitEditing: () => positionRef.current?.focus(),
                returnKeyType: 'next',
                keyboardType: 'decimal-pad'
              }}
              className='mb-4'
            />
            <CustomDropdown
              data={[
                {
                  label: 'Armador',
                  value: 'armador'
                }, {
                  label: 'Pivô',
                  value: 'pivo'
                }, {
                  label: 'Ala',
                  value: 'ala'
                }
              ]}
              color='black'
              type='outline'
              formProps={{
                control,
                name: 'position'
              }}
              inputProps={{
                placeholder: 'Posição preferencial',
                returnKeyType: 'next'
              }}
              className='mb-4'
            />
            <CustomButton color='primary' type='filled' label='Atualizar' className='mt-10' onPress={handleSubmit(handleSave)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfile