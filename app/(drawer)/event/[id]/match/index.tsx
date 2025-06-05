import { View, Text, Modal, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CustomButton from '@/components/buttons/customButton';
import { getMatchById, add30Seconds, pauseMatchTimer, startMatchTimer, endMatch, add10Minutes } from '@/api/matchApi';
import { Match, MatchModel, Player, PlayerScore, Score, Team } from '@/model/models';
import Toast from 'react-native-toast-message';
import { addPlayerScore, getTeamMatchScore } from '@/api/playerScoreApi';
import { getScores } from '@/api/scoreApi';
import TeamPlayerModal from '@/components/modals/teamPlayerModal';
import CustomTitle from '@/components/customTitle';
import { getTeamById } from '@/api/teamApi';
import NavHeader from '@/components/navHeader';
import moment from 'moment';
import ConfirmModal from '@/components/modals/confirmationModal';
import EndMatchModal from '@/components/modals/endMatchModal';

const EventMatch = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { matchId } = useLocalSearchParams<{ matchId: string }>();
  const [time, setTime] = useState(600);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedScore, setSelectedScore] = useState<Score | null>(null)
  const queryClient = useQueryClient();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

  const [teamPlayerModalVisible, setTeamPlayerModalVisible] = useState(false);

  // const confirmModalMemo = useMemo(() => {
  //   return <ConfirmModal message='Você tem certeza que deseja finalizar a partida?' title='Finalizar Partida' onConfirm={() => {
  //     handleEndMatch()
  //   }} visible={confirmModalVisible} dismiss={() => setConfirmModalVisible(false)} />
  // }, [confirmModalVisible])

  // Fetch match data
  const { data: matchData, isLoading: matchLoading, isSuccess: matchSuccess, refetch: matchRefetch } = useQuery<MatchModel | undefined>(['match', matchId], () => {
    return getMatchById({
      id: matchId,
    } as Match);
  });


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

  const addPlayerScoreMutation = useMutation(addPlayerScore, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matchScore', matchId])
    },
    onError: () => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to add player score.' });
    },
  });

  const addTimeMutation = useMutation(add30Seconds, {
    onSuccess: () => {
      queryClient.invalidateQueries(['match', matchId])
    },
    onError: () => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to add time.' });
    },
  });

  const resetTimerMutation = useMutation(add10Minutes, {
    onSuccess: () => {
      queryClient.invalidateQueries(['match', matchId])
    },
    onError: () => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to reset timer.' });
    },
  });

  const pauseTimerMutation = useMutation(pauseMatchTimer, {
    onSuccess: () => {
      setIsRunning(false)
      queryClient.invalidateQueries(['match', matchId])
    },
    onError: () => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to pause timer.' });
    },
  });

  const startTimerMutation = useMutation(startMatchTimer, {
    onSuccess: () => {
      setIsRunning(true)
      queryClient.invalidateQueries(['match', matchId])
    },
    onError: () => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to start timer.' });
    },
  });

  const endMatchMutation = useMutation(endMatch, {
    onSuccess: () => {
      setIsRunning(false)
      queryClient.invalidateQueries(['match', matchId])
    },
    onError: () => {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to start timer.' });
    },
  });

  const confirmModalMemo = useMemo(() => {
    if (teamBData && teamAData && matchScoreData) {
      let winner;

      if (matchScoreData.teamA.points > matchScoreData.teamB.points) {
        winner = teamAData.name
      } else if (matchScoreData.teamA.points < matchScoreData.teamB.points) {
        winner = teamBData.name
      } else {
        winner = 'Empate'
      }

      return <EndMatchModal
        add30sec={() => {
          handleAddTime()
          handleStartTimer()
          setConfirmModalVisible(false)
        }}
        endMatch={() => {
          handleEndMatch()
          setConfirmModalVisible(false)
          router.dismissTo(`/event/${id}`)
        }}
        resetTimer={() => {
          handleResetTimer()
          handleStartTimer()
          setConfirmModalVisible(false)
        }}
        winnerTeam={winner}
        visible={confirmModalVisible}
      />
    }
  }, [confirmModalVisible, teamAData, teamBData, matchScoreData])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            queryClient.invalidateQueries(['match', matchId])
            if (!confirmModalVisible) {
              handlePauseTimer()
              setConfirmModalVisible(true)
            }
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (matchData) {
      const startTime = moment(matchData.time_start || new Date());
      const remainingMs = (matchData.duration + (matchData.pause_duration || 0)) - (moment((matchData.time_pause ? matchData.time_pause : new Date())).diff(startTime))
      const remainingSeconds = moment.duration(remainingMs).asSeconds().toFixed(0) as unknown as number
      if (remainingSeconds <= 0 || matchData.time_end) {
        // router.dismissTo(`/event/${id}`)
        setTime(0);
        setConfirmModalVisible(true)
      } else {
        setTime(remainingSeconds);
      }
      if (!isRunning) {
        setIsRunning(matchData.time_start && !matchData.time_pause);
      }
    } else {
      setTime(600)
    }
  }, [matchData, matchSuccess]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleMarkPoints = (player: Player) => {
    if (selectedScore) {
      addPlayerScoreMutation.mutate({
        player_id: player.id,
        match_id: matchId,
        score_id: selectedScore.id
      } as PlayerScore);
    } else {
      Toast.show({ type: 'info', text1: 'Select Team and Player', text2: 'Please select both.' });
    }
    setSelectedScore(null)
    setTeamPlayerModalVisible(false)
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

  const handleEndMatch = () => {
    if (matchData) {
      endMatchMutation.mutate(matchData);
    }
  };

  const handleResetTimer = () => {
    if (matchData) {
      resetTimerMutation.mutate(matchData);
    }
  };


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
          onPress: () => router.dismiss(),
        }}
        className="bg-secondary"
      />
      <ScrollView className="flex-1 bg-secondary">
        <View className="flex-1 justify-center items-center">
          <CustomTitle title={formatTime(time)} className="mb-5" sizeClass='text-5xl' color='white' />
          <View className='flex-row justify-between items-center w-full px-5 mb-10'>
            <View className='flex-1 items-center'>
              <CustomTitle title={teamAData.name} sizeClass='text-3xl' color='white' />
              <CustomTitle title={matchScoreData.teamA.points.toString()} sizeClass='text-3xl' color='white' />
              <CustomTitle title={`Faltas: ${matchScoreData.teamA.fouls.toString()}`} className='mt-10' sizeClass='text-xl' color='white' />
            </View>
            <View className='flex-1 items-center'>
              <CustomTitle title='X' sizeClass='text-5xl' color='white' />
            </View>
            <View className='flex-1 items-center'>
              <CustomTitle title={teamBData.name} sizeClass='text-3xl' color='white' />
              <CustomTitle title={matchScoreData.teamB.points.toString()} sizeClass='text-3xl' color='white' />
              <CustomTitle title={`Faltas: ${matchScoreData.teamB.fouls.toString()}`} className='mt-10' sizeClass='text-xl' color='white' />
            </View>
          </View>
          <View className='flex-column justify-center items-center w-full px-5 mb-10'>
            {
              isRunning ?
                <CustomButton label="Pausar" onPress={handlePauseTimer} className="mb-2 w-3/4" />
                :
                <CustomButton label="Start" onPress={handleStartTimer} className="mb-2 w-3/4" />
            }
            <CustomButton label="+30s" onPress={handleAddTime} className="mb-2 w-3/4" />
            <View className="flex-row flex-wrap justify-center items-center w-full px-5 mb-10">
              {scores?.map((score) => (
                <View key={score.id} className="w-1/2 p-2">
                  <CustomButton
                    label={score.score}
                    onPress={() => {
                      setSelectedScore(score);
                      setTeamPlayerModalVisible(true);
                    }}
                    className="w-full"
                  />
                </View>
              ))}
            </View>
            <CustomButton label="Encerrar Partida" onPress={() => setConfirmModalVisible(true)} className="mb-2 w-3/4" />
          </View>
        </View>
      </ScrollView>
      <TeamPlayerModal
        onClose={() => {
          setSelectedScore(null)
          setTeamPlayerModalVisible(false)
        }}
        onConfirm={handleMarkPoints}
        teamA={teamAData}
        teamB={teamBData}
        visible={teamPlayerModalVisible}
      />
      {confirmModalMemo}
    </>
  );
};

export default EventMatch;