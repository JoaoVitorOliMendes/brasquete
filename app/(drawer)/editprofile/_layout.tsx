import React from 'react'
import { Stack } from 'expo-router'

const EditProfile = () => {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Editar Perfil'
        }}
      />
    </Stack>
  )
}

export default EditProfile
