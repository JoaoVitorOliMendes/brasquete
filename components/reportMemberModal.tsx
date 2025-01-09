import { View, Text, Modal, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CustomTitle from './customTitle'
import { useFieldArray, useForm } from 'react-hook-form'
import { Report } from '@/model/api/report'
import { ReportMotives } from '@/model/api/reportMotives'
import CustomButton from './customButton'
import CustomControlCheckbox from '@/components/customControlCheckbox'
import CustomCheckbox from './customCheckbox'
import CustomInput from './customInput'
import { TextInput } from 'react-native-gesture-handler'

interface ReportMemberModalProps {
  visible?: boolean,
  dismiss?: () => void
}

const ReportMemberModal = ({ visible, dismiss }: ReportMemberModalProps) => {
  const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm<Report>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "reportMotives"
  });

  const [otherFlag, setOtherFlag] = useState(false)

  useEffect(() => {
    if (!otherFlag)
      setValue('otherMotive', '')
  }, [otherFlag])

  const otherMotiveRef = useRef<TextInput>(null)

  const reportMotives: ReportMotives[] = [
    {
      id: 1,
      motive: 'Abuso verbal com jogadores'
    },
    {
      id: 2,
      motive: 'Violência ou ameaças'
    },
    {
      id: 3,
      motive: 'Trapaça'
    },
    {
      id: 4,
      motive: 'Bullying ou assédio'
    }
  ]

  const handleReport = (data: any) => {
    console.log(data)
    dismiss()
  }

  useEffect(() => {
    append(reportMotives)
  }, [])

  return (
    <Modal visible={visible} transparent>
      <View className='relative h-full w-full flex justify-center items-center'>
        <Pressable
          onPressOut={dismiss}
          className='absolute h-full w-full bg-black opacity-25'
          style={{
            elevation: 3
          }}
        >
        </Pressable>
        <View className='rounded-lg w-5/6 bg-primary p-10'>
          <CustomTitle title='Denunciar Jogador' color='white' sizeClass='text-2xl' className='mb-10' />
          <View>
            <Text className='text-white text-lg mb-4'>
              Motivo:
            </Text>
            <View className='flex flex-column'>
              {
                fields.map((item, idx) => {
                  return (
                    <CustomControlCheckbox
                      key={item.id}
                      formProps={{
                        control,
                        name: `reportMotives.${idx}.value`
                      }}
                      color='white'
                      label={item.motive}
                      className='mb-4'
                    />
                  )
                })
              }
              <CustomCheckbox label='Outro:' value={otherFlag} setValue={() => setOtherFlag(!otherFlag)} color='white' className='mt-5 mb-2' />
              <CustomInput
                type='filled'
                color='white'
                formProps={{
                  control,
                  name: 'otherMotive',
                }}
                inputProps={{
                  placeholder: '',
                  onSubmitEditing: () => handleSubmit(handleReport)
                }}
                inputRef={otherMotiveRef}
                multiline
                numberOfLines={5}
                disabled={otherFlag}
              />
            </View>
            <CustomButton label='Denunciar' color='white' className='mt-5' onPress={handleSubmit(handleReport)} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ReportMemberModal