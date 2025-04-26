import { View, Text, Modal, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import CustomButton from '@/components/buttons/customButton';
import { getMatchById, add30Seconds, pauseMatchTimer, startMatchTimer } from '@/api/matchApi';
import { Match, Player, Team } from '@/model/models';
import Toast from 'react-native-toast-message';
import { addPlayerScore, getTeamMatchScore } from '@/api/playerScoreApi';
import { getScores } from '@/api/scoreApi';
import TeamPlayerModal from '@/components/modals/teamPlayerModal';
import CustomTitle from '@/components/customTitle';
import { getTeamById } from '@/api/teamApi';
import NavHeader from '@/components/navHeader';

const EventMatch = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { matchId } = useLocalSearchParams<{ matchId: string }>();
  const [time, setTime] = useState(600); // 10 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [points, setPoints] = useState({ teamA: 0, teamB: 0 });
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<'teamA' | 'teamB' | null>(null);

  const [teamPlayerModalVisible, setTeamPlayerModalVisible] = useState(false);

  // Fetch match data
  const { data: matchData, isLoading: matchLoading } = useQuery(['match', matchId], () =>
    getMatchById({
      id: matchId,
    } as Match)
  );


  const { data: teamAData, isLoading: teamALoading } = useQuery(['team', matchData?.team_a_id], () => getTeamById({ id: matchData?.team_a_id } as Team), {
    enabled: !!matchData
  })
  const { data: teamBData, isLoading: teamBLoading } = useQuery(['team', matchData?.team_b_id], () => getTeamById({ id: matchData?.team_b_id } as Team), {
    enabled: !!matchData
  })

  // Fetch Match Scores
  const { data: matchScoreData, isLoading: matchScoreLoading } = useQuery(['matchScore', matchId], () => getTeamMatchScore(matchData), {
    enabled: !!matchData
  });

  // Fetch Scores
  const { data: scores, isLoading: scoresLoading } = useQuery(['scores'], getScores)

  const addPlayerScoreMutation = useMutation(addPlayerScore);

  const addTimeMutation = useMutation(add30Seconds, {
    onSuccess: () => {
      setTime((prevTime) => prevTime + 30); // Add 30 seconds
    },
    onError: () => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to add time.' });
    },
  });

  const pauseTimerMutation = useMutation(pauseMatchTimer, {
    onSuccess: () => {
      setIsRunning(false);
    },
    onError: () => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to pause timer.' });
    },
  });

  const startTimerMutation = useMutation(startMatchTimer, {
    onSuccess: () => {
      setIsRunning(true);
    },
    onError: () => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to start timer.' });
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleMarkPoints = (scoreId: string) => {
    if (selectedPlayer && selectedTeam) {
      addPlayerScoreMutation.mutate({
        player_id: selectedPlayer.id,
        match_id: matchId,
        team_id: selectedTeam === 'teamA' ? matchData?.team_a_id : matchData?.team_b_id,
        score_id: scoreId,
        count: 1,
      });
    } else {
      Toast.show({ type: 'info', text1: 'Select Team and Player', text2: 'Please select both.' });
    }
  };

  const handleAddTime = () => {
    if (matchData) {
      addTimeMutation.mutate(matchData);
    }
  };

  const handlePauseTimer = () => {
    if (matchData) {
      pauseTimerMutation.mutate(matchData);
    }
  };

  const handleStartTimer = () => {
    if (matchData) {
      startTimerMutation.mutate(matchData);
    }
  }

  if (!matchData || !teamAData || !teamBData || !scores || !matchScoreData) {
    return (
      <></>
    );
  }

  return (
    <>
      <NavHeader
        title="Partida"
        iconProps={{
          iconProps: { color: 'white', icon: 'arrow-back' },
          onPress: () => router.dismissTo(`/event/${id}`),
        }}
        className="bg-secondary"
      />
      <ScrollView className="flex-1 bg-secondary">
        <View className="flex-1 justify-center items-center">
          <CustomTitle title={formatTime(time)} className="mb-5" sizeClass='text-5xl' />
          <View className='flex-row justify-between items-center w-full px-5 mb-10'>
            <View className='flex-1 items-center'>
              <CustomTitle title={teamAData.name} sizeClass='text-3xl' />
              <CustomTitle title={matchScoreData.teamA.toString()} sizeClass='text-3xl' />
            </View>
            <View className='flex-1 items-center'>
              <CustomTitle title='X' sizeClass='text-5xl' />
            </View>
            <View className='flex-1 items-center'>
              <CustomTitle title={teamBData.name} sizeClass='text-3xl' />
              <CustomTitle title={matchScoreData.teamB.toString()} sizeClass='text-3xl' />
            </View>
          </View>
          <View className='flex-column justify-center items-center w-full px-5 mb-10'>
            <CustomButton label="Start" onPress={handleStartTimer} className="mb-2 w-3/4" />
            <CustomButton label="Pausar" onPress={handlePauseTimer} className="mb-2 w-3/4" />
            <CustomButton label="+30s" onPress={handleAddTime} className="mb-2 w-3/4" />
            {
              scores?.map((score) => {
                console.log('score', score)
                return (
                  <CustomButton
                    key={score.id}
                    label={score.score}
                    onPress={() => setTeamPlayerModalVisible(true)}
                    className="mb-2 w-3/4"
                  />
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      <TeamPlayerModal
        onClose={() => setTeamPlayerModalVisible(false)}
        onConfirm={console.log}
        teamA={matchData.team_a_id}
        teamB={matchData.team_b_id}
        visible={teamPlayerModalVisible}
      />
    </>
  );
};

export default EventMatch;