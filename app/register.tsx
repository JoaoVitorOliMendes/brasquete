import { View, Text, ScrollView, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useRouter } from 'expo-router'
import NavHeader from '@/components/navHeader'
import CustomTitle from '@/components/customTitle'
import CustomInput from '@/components/forms/customInput'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/buttons/customButton'
import { StatusBar } from 'expo-status-bar'
import { supabase } from '@/api/supabase'
import { RegisterForm } from '@/model/RegisterForm'
import Toast from 'react-native-toast-message'
import { register } from '@/api/authApi'
import { useMutation } from '@tanstack/react-query'
import CustomDropdown from '@/components/forms/customDropdown'


const Register = () => {
  const [showConfirmPass, setShowConfirmPass] = useState(true)
  const [showPass, setShowPass] = useState(true)

  const router = useRouter()
  const { control, handleSubmit, formState: { errors }, getValues, watch } = useForm<RegisterForm>()
  const nameRef = useRef<TextInput>(null)
  const surnameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const heightRef = useRef<TextInput>(null)
  const positionRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmPassRef = useRef<TextInput>(null)
  const registerMutation = useMutation(register);

  const handleRegister = async (data: RegisterForm) => {
    
    const { session, user } = await registerMutation.mutateAsync(data)
    if (registerMutation.isSuccess)
      if (!session)
        Toast.show({ type: 'info', text1: 'Aviso', text2: 'Por favor verifique seu email', position: 'bottom' })
    router.dismissTo('/splash')
  }

  return (
    <SafeAreaView className='h-full'>
      <StatusBar translucent backgroundColor='transparent' />
      {router.canGoBack() && <NavHeader iconProps={{ iconProps: { color: 'black', icon: 'arrow-back' }, onPress: () => router.back() }} />}
      <ScrollView nestedScrollEnabled={true}>
        <View className='p-5'>
          <CustomTitle color='black' title='Crie sua conta' />
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
                onSubmitEditing: () => emailRef.current?.focus(),
                returnKeyType: 'next'
              }}
              className='mb-4'
            />
            <CustomInput
              color='black'
              type='outline'
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
                  value: 'Armador'
                }, {
                  label: 'Pivô',
                  value: 'Pivô'
                }, {
                  label: 'Ala',
                  value: 'Ala'
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
                onSubmitEditing: () => passwordRef.current?.focus(),
              }}
              className='mb-4'
              watch={watch}
            />
            <CustomInput
              rightIcon={{ iconProps: { icon: 'eye' }, onPress: (e) => setShowPass(!showPass) }}
              color='black'
              type='outline'
              inputRef={passwordRef}
              formProps={{
                control,
                name: 'password',
                rules: {
                  required: 'Senha é obrigatório',
                  minLength: {
                    value: 8,
                    message: 'A senha deve ter no mínimo 8 caracteres'
                  }
                }
              }}
              inputProps={{
                placeholder: 'Senha',
                onSubmitEditing: () => confirmPassRef.current?.focus(),
                returnKeyType: 'next',
                secureTextEntry: showPass
              }}
              className='mb-4'
            />
            <CustomInput
              rightIcon={{ iconProps: { icon: 'eye' }, onPress: (e) => setShowConfirmPass(!showConfirmPass) }}
              color='black'
              type='outline'
              inputRef={confirmPassRef}
              formProps={{
                control,
                name: 'confirmPassword',
                rules: {
                  required: 'Por favor, confirme sua senha',
                  validate: (val) => {
                    return val === getValues().password ?? 'As senhas devem ser iguais'
                  },
                  minLength: {
                    value: 8,
                    message: 'A senha deve ter no mínimo 8 caracteres'
                  }
                }
              }}
              inputProps={{
                placeholder: 'Confirmar Senha',
                onSubmitEditing: () => handleSubmit(handleRegister),
                secureTextEntry: showConfirmPass
              }}
              className='mb-4'
            />
            <CustomButton color='primary' type='filled' label='Cadastrar' className='mb-5' onPress={handleSubmit(handleRegister)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register