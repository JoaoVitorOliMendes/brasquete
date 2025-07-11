import { GroupEvent, GroupMember } from "@/model/models";
import { useForm } from "react-hook-form";
import { Modal, Pressable, View, Text, TextInput } from "react-native";
import CustomTitle from "../customTitle";
import CustomButton from "../buttons/customButton";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CustomInput from "../forms/customInput";
import { DateTimePickerForm } from "@/model/formModels";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertEvent } from "@/api/eventsApi";
import Toast from "react-native-toast-message";
import { changeStatusGroupMember } from "@/api/groupMemberApi";
import { fetchUser } from "@/api/authApi";
import { useRouter } from "expo-router";

interface CreateEventModalProps {
  visible?: boolean,
  groupId: string,
  dismiss: () => void
}

const CreateEventModal = ({ groupId, visible, dismiss = () => { } }: CreateEventModalProps) => {
  const [date, setDate] = useState<Date | null>(null)
  const insertEventMutation = useMutation(insertEvent)
  const changeStatusGMMutation = useMutation(changeStatusGroupMember)
  const { data: user } = useQuery(['user'], fetchUser);
  const router = useRouter();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date || new Date(),
      onChange,
      mode: currentMode,
      is24Hour: false,
      minimumDate: new Date()
    })
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }


  const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm<DateTimePickerForm>()
  const dateRef = useRef<TextInput>(null)
  const timeRef = useRef<TextInput>(null)

  const createEvent = async (data: DateTimePickerForm) => {
    if (data.completeDate <= new Date()) {
      Toast.show({
        type: 'error',
        text1: 'Data inválida',
        text2: 'A data deve ser maior que a data atual'
      })
      return
    }
    const event = await insertEventMutation.mutateAsync({
      date: data.completeDate.toISOString(),
      group_id: groupId
    } as GroupEvent)
    await changeStatusGMMutation.mutateAsync({
      confirmed: 1,
      id: user?.id,
    } as GroupMember)
    Toast.show({
      type: 'success',
      text1: 'Evento Criado',
      text2: 'Evento agendado com sucesso!'
    })
    dismiss()
    router.dismiss()
  }

  useEffect(() => {
    if (date) {
      setValue('date', date?.toLocaleDateString())
      setValue('time', date?.toLocaleTimeString())
      setValue('completeDate', date)
    }
  }, [date])

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
        <View className='rounded-lg w-5/6 bg-primary p-10'>
          <CustomTitle title='Agendar Evento' color='white' sizeClass='text-2xl' className='mb-10' />
          <View>
            <Text className='text-white text-lg mb-4'>
              Data:
            </Text>
            <Pressable
              onPress={showDatepicker}
            >
              <CustomInput
                color='white'
                type='filled'
                inputRef={dateRef}
                formProps={{
                  control,
                  name: 'date',
                  rules: {
                    required: 'Data é obrigatório'
                  }
                }}
                inputProps={{
                  placeholder: 'Data',
                  onSubmitEditing: () => timeRef.current?.focus(),
                  returnKeyType: 'next',
                  keyboardType: 'email-address'
                }}
                className='mb-4'
                disabled
              />
            </Pressable>
            <Pressable
              onPress={showTimepicker}
            >
              <CustomInput
                color='white'
                type='filled'
                inputRef={timeRef}
                formProps={{
                  control,
                  name: 'time',
                  rules: {
                    required: 'Horário é obrigatório'
                  }
                }}
                inputProps={{
                  placeholder: 'Horário',
                  onSubmitEditing: handleSubmit(createEvent),
                  returnKeyType: 'next'
                }}
                className='mb-4'
                disabled
              />
            </Pressable>
            <CustomButton label='Agendar Evento' color='white' className='mt-5' onPress={handleSubmit(createEvent)} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CreateEventModal