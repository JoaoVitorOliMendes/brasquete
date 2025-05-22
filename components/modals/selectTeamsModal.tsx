import React, { useRef, useState } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Pressable, TextInput } from 'react-native';
import CustomButton from '@/components/buttons/customButton';
import { Team } from '@/model/models';
import CustomTitle from '../customTitle';
import { TimerPickerModal } from "react-native-timer-picker";
import CustomInput from '../forms/customInput';
import { useForm } from 'react-hook-form';
import { TimePickerForm } from '@/model/formModels';

interface TeamSelectionModalProps {
  teams: Team[]; // Accepts filtered teams
  visible: boolean;
  onClose: () => void;
  onConfirm: (selectedTeams: Team[], duration: number) => void;
}

const TeamSelectionModal = ({ teams, visible, onClose, onConfirm }: TeamSelectionModalProps) => {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [duration, setDuration] = useState(600000)
  const [showPicker, setShowPicker] = useState(false)
  const durationRef = useRef<TextInput>(null)

  const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm<TimePickerForm>()

  const formatTime = ({
    hours = 0,
    minutes = 0,
    seconds = 0,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    return ((minutes * 60) + seconds) * 1000;
  };

  const toggleTeamSelection = (team: Team) => {
    setSelectedTeams((prev) => {
      if (prev.includes(team)) {
        return prev.filter((t) => t !== team);
      } else if (prev.length < 2) {
        return [...prev, team];
      }
      return prev;
    });
  };

  return (
    <Modal visible={visible} transparent>
      <View className='relative h-full w-full flex justify-center items-center'>
        <Pressable
          onPressOut={onClose}
          className='absolute h-full w-full bg-black opacity-25'
          style={{
            elevation: 3
          }}
        />
        <View className='rounded-lg w-5/6 bg-secondary p-10'>
          <CustomTitle title='Selecione dois times' sizeClass='text-2xl' className='mb-10' />
          <FlatList
            data={teams}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => toggleTeamSelection(item)}
                className={`p-5 border ${selectedTeams.includes(item) ? 'bg-primary' : 'bg-white'
                  }
                  ${index == 0 ? 'rounded-t-lg' : index == teams.length - 1 && 'rounded-b-lg'
                  }`}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <Pressable
            onPress={() => setShowPicker(true)}
          >
            <CustomInput
              color='white'
              type='filled'
              inputRef={durationRef}
              formProps={{
                control,
                name: 'duration',
                rules: {
                  required: 'Duração é obrigatório'
                }
              }}
              inputProps={{
                defaultValue: '10:00'
              }}
              className='mb-4'
              disabled
            />
          </Pressable>
          <View className='flex-row justify-between mt-10'>
            <CustomButton label="Cancel" onPress={onClose} color='black' />
            <CustomButton
              label="Confirm"
              onPress={() => {
                if (selectedTeams.length === 2) {
                  onConfirm(selectedTeams, duration);
                } else {
                  alert('Please select exactly two teams.');
                }
              }}
            />
          </View>
        </View>
      </View>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          setValue('duration', pickedDuration.minutes + ':' + pickedDuration.seconds)
          setDuration(formatTime(pickedDuration))
          setShowPicker(false);
        }}
        modalTitle="Duração da Partida"
        onCancel={() => setShowPicker(false)}
        initialValue={
          {
            minutes: 10
          }
        }
        closeOnOverlayPress
        hideHours
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </Modal>
  );
};

export default TeamSelectionModal;