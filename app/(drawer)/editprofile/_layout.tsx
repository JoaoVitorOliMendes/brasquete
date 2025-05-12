import { View, Text, TextInput, Image, Pressable, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import CustomDrawerHeader from '@/components/drawer/customDrawerHeader'

const positions = ['Armador', 'Ala-Armador', 'Ala', 'Ala-Pivô', 'Pivô']

const EditProfile = () => {
  const [selectedPosition, setSelectedPosition] = useState('Armador')
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <CustomDrawerHeader title="Editar Perfil" />

        {/* Imagem de perfil */}
        <Image
          source={images.person}
          className="rounded-full !w-40 !h-40 self-center my-6"
        />

        {/* Nome */}
        <Text className="text-black text-sm mb-1">Nome</Text>
        <TextInput
          className="bg-white/20 text-black p-3 mb-4 rounded-md border border-black/20"
          placeholder="Digite seu nome"
          placeholderTextColor="#ccc"
        />

        {/* Altura */}
        <Text className="text-black text-sm mb-1">Altura</Text>
        <TextInput
          className="bg-white/20 text-black p-3 mb-4 rounded-md border border-black/20"
          placeholder="Digite sua altura"
          placeholderTextColor="#ccc"
        />

        {/* Posição (com Modal) */}
        <Text className="text-black text-sm mb-1">Posição</Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-white/20 border border-black/20 p-3 rounded-md mb-4"
        >
          <Text className="text-black">{selectedPosition}</Text>
        </Pressable>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-5 rounded-md w-4/5">
              {positions.map((pos) => (
                <Pressable
                  key={pos}
                  onPress={() => {
                    setSelectedPosition(pos)
                    setModalVisible(false)
                  }}
                  className="p-3 border-b border-gray-300"
                >
                  <Text className="text-black">{pos}</Text>
                </Pressable>
              ))}
              <Pressable onPress={() => setModalVisible(false)} className="mt-3">
                <Text className="text-red-500 text-center">Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Botão salvar */}
        <Pressable className="bg-secondary p-4 rounded-xl items-center mt-6">
          <Text className="text-white font-semibold">Salvar Alterações</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfile
