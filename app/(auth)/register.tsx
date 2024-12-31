import { View, Text, ScrollView, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import NavHeader from '@/components/navHeader'
import CustomTitle from '@/components/customTitle'
import CustomInput from '@/components/customInput'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/customButton'
import CustomDropdown from '@/components/customDropdown'
import { Account } from '@/model/Account'

const Register = () => {
  const [showConfirmPass, setShowConfirmPass] = useState(true)
  const [showPass, setShowPass] = useState(true)

  const router = useRouter()
  const { control, handleSubmit, formState: { errors }, getValues } = useForm<Account>()
  const nameRef = useRef<TextInput>(null)
  const surnameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const heightRef = useRef<TextInput>(null)
  const positionRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmPassRef = useRef<TextInput>(null)

  const handleRegister = (data: Account) => {
    console.log(data)
  }

  return (
    <SafeAreaView className='h-full'>
      {router.canGoBack() && <NavHeader iconProps={{ icon: 'arrow-back', onPress: () => router.back()}} />}
      <ScrollView nestedScrollEnabled={true}>
        <View className='p-5'>
          <CustomTitle color='black' title='Crie sua conta' />
          <View className='mt-10'>
            <CustomInput
              errorMsg={errors.name?.message}
              color='black'
              type='outline'
              ref={nameRef}
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
              errorMsg={errors.surname?.message}
              color='black'
              type='outline'
              ref={surnameRef}
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
              errorMsg={errors.email?.message}
              color='black'
              type='outline'
              ref={emailRef}
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
                onSubmitEditing: () => heightRef.current?.focus(),
                returnKeyType: 'next',
                keyboardType: 'email-address'
              }}
              className='mb-4'
            />
            <CustomInput
              errorMsg={errors.height?.message}
              color='black'
              type='outline'
              ref={heightRef}
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
                },{
                  label: 'Pivô',
                  value: 'pivo'
                },{
                  label: 'Ala',
                  value: 'ala'
                }
              ]}
              errorMsg={errors.position?.message}
              color='black'
              type='outline'
              ref={positionRef}
              formProps={{
                control,
                name: 'position'
              }}
              inputProps={{
                placeholder: 'Posição preferencial',
                onSubmitEditing: () => passwordRef.current?.focus(),
              }}
              className='mb-4'
            />
            <CustomInput
              rightIcon={{ icon: 'eye', onPress: (e) => setShowPass(!showPass)}}
              errorMsg={errors.password?.message}
              color='black'
              type='outline'
              ref={passwordRef}
              formProps={{
                control,
                name: 'password',
                rules: {
                  required: 'Senha é obrigatório'
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
              rightIcon={{ icon: 'eye', onPress: (e) => setShowConfirmPass(!showConfirmPass)}}
              errorMsg={errors.confirmPass?.message}
              color='black'
              type='outline'
              ref={confirmPassRef}
              formProps={{
                control,
                name: 'confirmPass',
                rules: {
                  required: 'Por favor, confirme sua senha',
                  validate: (val) => {
                    return val === getValues().password || 'As senhas devem ser iguais'
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
            <CustomButton color='primary' type='filled' label='Cadastrar' className='mb-5' onPress={handleSubmit(handleRegister, console.log)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register