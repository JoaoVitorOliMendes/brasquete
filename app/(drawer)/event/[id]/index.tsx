import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import NavHeader from '@/components/navHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import GroupMemberList from '@/components/groupMemberList';
import ExpandableIcon, { MenuItem } from '@/components/buttons/expandableIcon';
import CustomTitle from '@/components/customTitle';
import { images } from '@/constants';
import { changeEventStatus, getEventByid } from '@/api/eventsApi';
import { fetchUser } from '@/api/authApi';
import { changeStatusGroupMember } from '@/api/groupMemberApi';
import { GroupEvent, GroupMember, MatchModel, Team } from '@/model/models';
import { insertMatch } from '@/api/matchApi';
import moment, { duration } from 'moment';
import TeamSelectionModal from '@/components/modals/selectTeamsModal';
import { getTeamsForEvent } from '@/api/teamApi';
import CustomImage from '@/components/customImage';
import ConfirmModal from '@/components/modals/confirmationModal';

const EventsDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [teamSelectionVisible, setTeamSelectionVisible] = useState(false);
  const [endEventVisible, setEndEventVisible] = useState(false);

  // Fetch user data
  const { data: user } = useQuery(['user'], fetchUser);

  // Fetch event data
  const { data: eventsData, isLoading: eventsLoading } = useQuery(['events', id], () => getEventByid(id));

  // Fetch teams data
  const { data: teamsData } = useQuery(
    ['teams', id],
    () => (eventsData ? getTeamsForEvent(eventsData) : Promise.resolve([])),
    {
      enabled: !!eventsData,
    }
  );

  // Mutations
  const changeStatusGMMutation = useMutation(changeStatusGroupMember);
  const changeStatusEVMutation = useMutation(changeEventStatus);

  useEffect(() => {
    if (eventsData && eventsData.status == 2) {
      Toast.show({ type: 'info', text1: 'Encerrado', text2: 'Evento Encerrado' })
      router.dismissTo('/event')
    }
  }, [eventsData])

  // Determine if the user is a group member
  const userMember = eventsData?.groups?.group_member?.find((item) => item.user_id === user?.id);

  // Group member list
  const groupMemberList = eventsData ? (
    <GroupMemberList
      addMemberBtn={false}
      members={eventsData.groups}
      separator
      admin={user?.id === eventsData.groups?.admin_id}
    />
  ) : null;

  // Handle confirming teams
  const handleConfirmTeams = async (selectedTeams: Team[], durationMs: number) => {
    try {
      const now = new Date();
      const match = {
        event_id: eventsData.id,
        team_a_id: selectedTeams[0].id,
        team_b_id: selectedTeams[1].id,
        time_start: null,
        time_pause: null,
        duration: durationMs,
      };
      const matchData = await insertMatch(match as unknown as MatchModel);
      setTeamSelectionVisible(false);
      router.push(`/event/${id}/match?matchId=${matchData[0].id}`);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to create match.' });
    }
  };

  // Generate menu items dynamically
  const extendedMenu: MenuItem[] = [];
  if (eventsData) {
    const isAdmin = user?.id === eventsData.groups?.admin_id;

    if (isAdmin) {
      if (eventsData.status === 1) {
        extendedMenu.push(
          {
            icon: 'list',
            label: 'Times',
            onPress: () => router.push(`/event/${id}/teams`),
          },
          {
            icon: 'play',
            label: 'Iniciar Partida',
            onPress: () => setTeamSelectionVisible(true),
          },
          {
            icon: 'flag',
            label: 'Encerrar Evento',
            onPress: () => setEndEventVisible(true),
          }
        );
      } else {
        extendedMenu.push(
          {
            icon: 'play',
            label: 'Iniciar',
            onPress: async () => {
              await changeStatusEVMutation.mutateAsync({
                id: eventsData.id,
                status: 1,
              } as GroupEvent);
              queryClient.invalidateQueries(['events', id]);
            },
          },
          {
            icon: 'ban-outline',
            label: 'Cancelar Evento',
            onPress: async () => {
              await changeStatusEVMutation.mutateAsync({
                id: eventsData.id,
                status: 2,
              } as GroupEvent);
              queryClient.invalidateQueries(['events', id]);
            },
          }
        );
      }
    } else {
      if (userMember?.confirmed !== 1) {
        extendedMenu.push({
          icon: 'thumbs-up-outline',
          label: 'Confirmar Presença',
          onPress: async () => {
            await changeStatusGMMutation.mutateAsync({
              confirmed: 1,
              id: userMember?.id,
            } as GroupMember);
            queryClient.invalidateQueries(['events', id]);
          },
        });
      } else {
        extendedMenu.push({
          icon: 'thumbs-down-outline',
          label: 'Indicar Ausência',
          onPress: async () => {
            await changeStatusGMMutation.mutateAsync({
              confirmed: 2,
              id: userMember?.id,
            } as GroupMember);
            queryClient.invalidateQueries(['events', id]);
          },
        });
      }
    }
  }

  // Handle loading and error states
  if (eventsLoading) return <></>;

  if (!eventsLoading && !(eventsData && eventsData.groups)) {
    Toast.show({ type: 'error', text1: 'Error', text2: 'No Event Found' });
    router.dismissTo('/event');
    return null;
  }


  // Format event date
  const formattedDate = eventsData?.date
    ? `${new Date(eventsData.date).getDate().toString().padStart(2, '0')}/${(
      new Date(eventsData.date).getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${new Date(eventsData.date).getFullYear().toString().slice(-2)} ${new Date(
        eventsData.date
      )
        .getHours()
        .toString()
        .padStart(2, '0')}:${new Date(eventsData.date).getMinutes().toString().padStart(2, '0')}`
    : '';

  return (
    <>
      <NavHeader
        title={eventsData?.groups?.name}
        iconProps={{
          iconProps: { color: 'white', icon: 'arrow-back' },
          onPress: () => router.dismissTo('/event'),
        }}
        className="bg-secondary"
      />
      <TeamSelectionModal
        teams={teamsData || []}
        visible={teamSelectionVisible}
        onClose={() => setTeamSelectionVisible(false)}
        onConfirm={handleConfirmTeams}
      />
      <ScrollView
        overScrollMode="never"
        persistentScrollbar
        showsVerticalScrollIndicator
        className="flex-1"
      >
        <SafeAreaView className="p-4">
          <View className="w-full h-[33vh]">
            <CustomImage
              className="w-full h-full object-cover"
              altImage={images.map}
              style={null}
              imageUrl={eventsData?.groups?.location?.location_img ?? ''}
            />
          </View>
          <View>
            <CustomTitle
              title={formattedDate}
              sizeClass="text-3xl"
              className="font-bold text-center p-2 bg-primary m-4 rounded-full"
            />

            <View className='flex flex-row flex-wrap'>
              <CustomTitle title={`${eventsData?.groups?.location?.add_number},  ${eventsData?.groups?.location?.add_street}, ${eventsData?.groups?.location?.add_neighborhood}, ${eventsData?.groups?.location?.add_city} - ${eventsData?.groups?.location?.add_state}`} sizeClass='text-xl' className='my-4 basis-full' />
            </View>
          </View>
        </SafeAreaView>
        {groupMemberList}
      </ScrollView>
      <ExpandableIcon menuItems={extendedMenu} />
      {
        eventsData &&
        <ConfirmModal
          visible={endEventVisible}
          title={'Encerrar Evento'}
          message={'Você tem certeza que deseja encerrar o evento?'}
          onConfirm={async () => {
            await changeStatusEVMutation.mutateAsync({
              id: eventsData.id,
              status: 2,
            } as GroupEvent);
            queryClient.invalidateQueries(['events', id]);
          }}
          dismiss={() => setEndEventVisible(false)}
        />
      }
    </>
  );
};

export default EventsDetail;