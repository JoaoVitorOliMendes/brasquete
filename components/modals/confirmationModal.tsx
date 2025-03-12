import { Modal, View, Pressable, Text } from "react-native"
import CustomButton from "../buttons/customButton"
import CustomTitle from "../customTitle"
import CustomInput from "../forms/customInput"

interface ConfirmModalProps {
  visible?: boolean,
  title: string,
  message: string,
  onConfirm: () => void,
  dismiss: () => void
}

const ConfirmModal = ({ title, message, onConfirm, visible, dismiss = () => { } }: ConfirmModalProps) => {

  return (
    <Modal visible={visible} transparent>
      <View className='relative h-full w-full flex justify-center items-center'>
        <Pressable
          onPressOut={dismiss}
          className='absolute h-full w-full bg-black opacity-25'
          style={{
            elevation: 3
          }}
        />
        <View className='rounded-lg w-5/6 bg-secondary p-10'>
          <CustomTitle title={title} color='white' sizeClass='text-2xl' className='mb-10' />
          <View>
            <Text className='text-center text-white text-lg mb-4'>
              {message}
            </Text>
            <View
              className="flex flex-row justify-between items-center"
            >
              <CustomButton label='Cancelar' color='primary' className='mt-5' onPress={dismiss} />
              <CustomButton label='Confirmar' color='white' className='mt-5' onPress={onConfirm} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmModal