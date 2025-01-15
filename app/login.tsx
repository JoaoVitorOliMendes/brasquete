import { View, Text, ImageBackground, ScrollView, TextInput } from 'react-native'
import React, { useRef } from 'react'
import { images } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavHeader from '@/components/navHeader'
import { Link, useRouter } from 'expo-router'
import CustomInput from '@/components/forms/customInput'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/buttons/customButton'
import CustomTitle from '@/components/customTitle'
import { Login as LoginModel } from '@/model/Login'
import { useAuth } from '@/context/AuthContext'
import { StatusBar } from 'expo-status-bar'

const Login = () => {
  const { onLogin } = useAuth()
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm<LoginModel>()
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const handleLogin = (data: LoginModel) => {
    if (onLogin) {
      onLogin(data)
      .then(() => {
        router.replace('/(drawer)')
      })
    }
  }

  return (
    <ImageBackground source={images.chalkboard}>
      <StatusBar translucent backgroundColor='transparent' />
      <SafeAreaView className='h-full'>
        {router.canGoBack() && <NavHeader iconProps={{ color: 'white', icon: 'arrow-back', onPress: () => router.back() }} />}
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
                  secureTextEntry: true,
                  placeholder: 'Senha',
                  onSubmitEditing: handleSubmit(handleLogin)
                }}
                className='mb-4'
              />
              <CustomButton color='primary' type='filled' label='Entrar' className='mb-5' onPress={handleSubmit(handleLogin)} />
              <Link href={'/forgotPass'} className='color-white underline'>Esqueci minha senha</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground >
  )
}

export default Login