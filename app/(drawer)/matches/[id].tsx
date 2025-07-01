import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import NavHeader from '@/components/navHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getClosedMatchesForUser, getMatchById } from '@/api/matchApi';
import { useQuery } from '@tanstack/react-query';
import { Match } from '@/model/models';
import moment from 'moment';
import { getMatchPlayersScores } from '@/api/playerScoreApi';
import PlayerScoreCard from '@/components/card/playerScoreCard';
import { fetchUser } from '@/api/authApi';
import CustomTitle from '@/components/customTitle';

const MatchDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data: user, isLoading: userIsLoading } = useQuery(['user'], fetchUser)
    const { data: matchById, isLoading } = useQuery(['match', id], () => getMatchById({ id: id } as Match))
    const { data: matchPlayersScores } = useQuery(['playerScore', 'match', id], () => getMatchPlayersScores(matchById), {
        enabled: !!matchById
    })
    const { data: closedMatches, isLoading: matchIsLoading } = useQuery(['matches', 'closed', user?.id], () => getClosedMatchesForUser(user), {
        enabled: !!user
    })

    const router = useRouter()

    if (!matchById) return <></>

    const formattedStartDate = moment(matchById.time_start).format('DD/MM/YY HH:mm');
    const formattedEndDate = moment(matchById.time_end).format('DD/MM/YY HH:mm');
    const durationMinutes = moment.duration(matchById.duration, 'milliseconds')
    const matchScores = closedMatches?.find(match => match.match_id === matchById.id);

    return (
        <>
            <NavHeader
                title={formattedStartDate}
                iconProps={{
                    iconProps: { color: 'white', icon: 'arrow-back' },
                    onPress: () => router.dismissTo('/matches')
                }}
                className={'bg-secondary'}
            />
            <ScrollView overScrollMode='never' persistentScrollbar showsVerticalScrollIndicator className='flex-1'>
                <SafeAreaView className='p-4'>
                    {/* Match Info */}
                    <View className="mb-6 p-4 bg-gray-300 rounded-lg">
                        <View className="flex flex-row justify-between items-center px-5">
                            {/* Team A */}
                            <View className="flex items-center">
                                <CustomTitle title={matchScores?.team_a_name ?? ''} sizeClass='text-3xl' color='black' />
                                <CustomTitle title={matchScores?.team_a_points ?? ''} sizeClass='text-3xl' color='black' />
                                <CustomTitle title={`Faltas: ${matchScores?.team_a_faltas ?? ''}`} sizeClass='text-xl' className='mt-5' color='black' />
                            </View>

                            <CustomTitle title='X' sizeClass='text-5xl' color='black' />

                            {/* Team B */}
                            <View className="flex items-center">
                                <CustomTitle title={matchScores?.team_b_name ?? ''} sizeClass='text-3xl' color='black' />
                                <CustomTitle title={matchScores?.team_b_points ?? ''} sizeClass='text-3xl' color='black' />
                                <CustomTitle title={`Faltas: ${matchScores?.team_b_faltas ?? ''}`} sizeClass='text-xl' className='mt-5' color='black' />
                            </View>
                        </View>
                    </View>
                    <View className='p-3 mb-5'>
                        <View className='bg-primary p-3 px-10 m-2 rounded-full flex-row justify-between items-center'>
                            <Text>
                                Duração:
                            </Text>
                            <Text>
                                {moment.utc(durationMinutes.asMilliseconds()).format("mm:ss")}
                            </Text>
                        </View>
                        <View className='bg-primary p-3 px-10 m-2 rounded-full flex-row justify-between items-center'>
                            <Text>
                                Horário de Início:
                            </Text>
                            <Text>
                                {formattedStartDate}
                            </Text>
                        </View>
                        <View className='bg-primary p-3 px-10 m-2 rounded-full flex-row justify-between items-center'>
                            <Text>
                                Horário de Término:
                            </Text>
                            <Text>
                                {formattedEndDate}
                            </Text>
                        </View>
                    </View>
                    {/* Player Scores */}
                    {
                        matchPlayersScores && matchPlayersScores.map((item, idx) => (
                            <PlayerScoreCard key={idx} player={item} />
                        ))
                    }
                </SafeAreaView>
            </ScrollView>
        </>
    )
}

export default MatchDetail