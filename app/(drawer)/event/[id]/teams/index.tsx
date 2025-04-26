import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import NavHeader from '@/components/navHeader';
import CustomButton from '@/components/buttons/customButton';
import CardTeam from '@/components/card/cardTeam';
import TeamPickerModal from '@/components/modals/teamPickerModal';
import { getTeamsForEvent } from '@/api/teamApi';
import { getEventByid } from '@/api/eventsApi';
import { Team } from '@/model/models';
import Toast from 'react-native-toast-message';

const Teams = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Fetch event data
  const { data: eventsData, isLoading: eventsLoading } = useQuery(['events', id], () => getEventByid(id));

  // Fetch teams data
  const { data: teamsData, isLoading: teamsLoading } = useQuery(['teams', id], () =>
    eventsData ? getTeamsForEvent(eventsData) : Promise.resolve([])
  );

  const handleEditTeam = (team: Team) => {
    setSelectedTeam(team);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedTeam(null);
    setModalVisible(false);
  };

  if (eventsLoading || teamsLoading) return null;

  if (!eventsData) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'Event not found.' });
    return null;
  }

  return (
    <>
      <NavHeader
        title="Teams"
        iconProps={{
          iconProps: { color: 'white', icon: 'arrow-back' },
          onPress: () => router.dismissTo(`/event/${id}`),
        }}
        className="bg-secondary"
      />
      <ScrollView className="flex-1 bg-secondary">
        <CustomButton
          label="Criar Time"
          onPress={() => handleEditTeam({ id: '', name: '', player: [] })}
          className="m-4"
        />
        {teamsData?.map((team) => (
          <TouchableOpacity key={team.id}>
            <View className="my-3 p-3">
              <CardTeam team={team} onClick={() => handleEditTeam(team)}/>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {modalVisible && (
        <TeamPickerModal
          visible={modalVisible}
          dismiss={handleCloseModal}
          eventsData={eventsData}
          team={selectedTeam}
        />
      )}
    </>
  );
};

export default Teams;