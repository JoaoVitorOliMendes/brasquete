import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import CustomPressIcon from '../buttons/customPressIcon'

interface TeamPickerModalProps {
    visible?: boolean,
    dismiss?: () => void
}

const TeamPickerModal = ({ visible, dismiss }: TeamPickerModalProps) => {
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
                <View className='rounded-lg w-5/6 h-1/2 bg-secondary p-10'>
                    <View className='py-4 pb-72 flex flex-row flex-wrap justify-center items-center relative border-solid border-2 border-primary'>
                        <CustomPressIcon iconProps={{ icon: 'person', color: 'white', size: 42 }} onPress={dismiss} className='bg-primary p-3 absolute top-0 margin-auto' />
                        <CustomPressIcon iconProps={{ icon: 'person', color: 'white', size: 42 }} onPress={dismiss} className='bg-primary p-3 absolute top-20 left-0' />
                        <CustomPressIcon iconProps={{ icon: 'person', color: 'white', size: 42 }} onPress={dismiss} className='bg-primary p-3 absolute top-20 right-0' />
                        <CustomPressIcon iconProps={{ icon: 'person', color: 'white', size: 42 }} onPress={dismiss} className='bg-primary p-3 absolute top-48 left-12' />
                        <CustomPressIcon iconProps={{ icon: 'person', color: 'white', size: 42 }} onPress={dismiss} className='bg-primary p-3 absolute top-48 right-12' />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default TeamPickerModal