import { Modal, View, Pressable, Text } from "react-native"
import CustomButton from "../buttons/customButton"
import CustomTitle from "../customTitle"
import CustomInput from "../forms/customInput"

interface EndMatchModalProps {
  visible?: boolean,
  winnerTeam: string,
  endMatch: () => void,
  resetTimer: () => void,
  add30sec: () => void,
}

const EndMatchModal = ({ winnerTeam, endMatch, visible, resetTimer, add30sec }: EndMatchModalProps) => {

  return (
    <Modal visible={visible} transparent>
      <View className='relative h-full w-full flex justify-center items-center'>
        <Pressable
          className='absolute h-full w-full bg-black opacity-25'
          style={{
            elevation: 3
          }}
        />
        <View className='rounded-lg w-11/12 bg-secondary text-white'>
          <View className="p-10 flex justify-center items-center">
            <CustomTitle title='Time vencedor:' color='white' sizeClass='text-2xl' className='mb-10' />
            <CustomTitle title={winnerTeam} color='white' sizeClass='text-5xl' className='mb-10' />
            <View
              className="flex flex-row justify-between items-center"
            >
              <CustomButton label='Finalizar Partida' color='primary' className='mt-5' onPress={endMatch} />
              <CustomButton label='Resetar Timer' color='white' className='mt-5' onPress={resetTimer} />
              <CustomButton label='+30s' color='white' className='mt-5' onPress={add30sec} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default EndMatchModal