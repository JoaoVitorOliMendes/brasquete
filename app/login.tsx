import { View, Text, ImageBackground, ScrollView, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { images } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavHeader from '@/components/navHeader'
import { Link, useRouter } from 'expo-router'
import CustomInput from '@/components/forms/customInput'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/buttons/customButton'
import CustomTitle from '@/components/customTitle'
import { LoginForm } from '@/model/formModels'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import { supabase } from '@/api/supabase'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/authApi'

const Login = () => {
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>()
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const [showPass, setShowPass] = useState(true)
  const loginMutation = useMutation(login)

  const signIn = async (data: LoginForm) => {
    const { session } = await loginMutation.mutateAsync(data)
  }

  return (
    <ImageBackground source={images.chalkboard}>
      <StatusBar translucent backgroundColor='transparent' />
      <SafeAreaView className='h-full'>
        {router.canGoBack() && <NavHeader iconProps={{ iconProps: { color: 'white', icon: 'arrow-back' }, onPress: () => router.back() }} />}
        <ScrollView>
          <View className='p-5'>
            <CustomTitle color='white' title='Login' />
            <View className='mt-10'>
              <CustomInput
                color='white'
                type='filled'
                inputRef={emailRef}
                formProps={{
                  control,
                  name: 'email',
                  rules: {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: 'Email invalido'
                    }
                  }
                }}
                inputProps={{
                  placeholder: 'Email',
                  onSubmitEditing: () => passwordRef.current?.focus(),
                  returnKeyType: 'next',
                  keyboardType: 'email-address'
                }}
                className='mb-4'
              />
              <CustomInput
                rightIcon={{ iconProps: { icon: 'eye' }, onPress: (e) => setShowPass(!showPass) }}
                color='white'
                type='filled'
                inputRef={passwordRef}
                formProps={{
                  control,
                  name: 'password',
                  rules: {
                    required: 'Senha é obrigatório'
                  }
                }}
                inputProps={{
                  placeholder: 'Senha',
                  onSubmitEditing: handleSubmit(signIn),
                  secureTextEntry: showPass
                }}
                className='mb-4'
              />
              <CustomButton color='primary' type='filled' label='Entrar' className='mb-5' onPress={handleSubmit(signIn)} />
              <Link href={'/forgotPass'} className='color-white underline'>Esqueci minha senha</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground >
  )
}

export default Login