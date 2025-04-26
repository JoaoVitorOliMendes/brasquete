import React, { useState } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import CustomButton from '@/components/buttons/customButton';
import { Team } from '@/model/models';
import CustomTitle from '../customTitle';

interface TeamSelectionModalProps {
  teams: Team[]; // Accepts filtered teams
  visible: boolean;
  onClose: () => void;
  onConfirm: (selectedTeams: Team[]) => void;
}

const TeamSelectionModal = ({ teams, visible, onClose, onConfirm }: TeamSelectionModalProps) => {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

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
          <View className='flex-row justify-between mt-10'>
            <CustomButton label="Cancel" onPress={onClose} color='black' />
            <CustomButton
              label="Confirm"
              onPress={() => {
                if (selectedTeams.length === 2) {
                  onConfirm(selectedTeams);
                } else {
                  alert('Please select exactly two teams.');
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TeamSelectionModal;