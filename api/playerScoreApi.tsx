import { mapper } from '@/model/mappings/mapper';
import { supabase } from './supabase';
import { Match, Player, PlayerScore, Team } from '@/model/models';

export const getTeamMatchScore = async (match: Match) => {
    const { data, error } = await supabase
        .from('player_score')
        .select(`
        *,
        score(*),
        match(
            *
        ),
        player(*)
    `)

    if (error)
        throw error;

    const teamAData = data?.filter((item: any) => {
        return item.match_id == match.id && item.match.team_a_id == item.player.team_id
    })
    const teamAPoints = teamAData.reduce((acc: number, item: any) => {
        if (['1 Ponto', '2 Pontos', '3 Pontos'].includes(item.score.score)) {
            let multiplier = 1;
            if (item.score.score === '2 Pontos') multiplier = 2;
            if (item.score.score === '3 Pontos') multiplier = 3;
            return acc + (item.count * multiplier);
        }
        return acc;
    }, 0) || 0;
    const teamAFouls = teamAData.reduce((acc: number, item: any) => {
        if (['Faltas'].includes(item.score.score)) {
            return acc + item.count;
        }
        return acc;
    }, 0) || 0;

    const teamBData = data?.filter((item: any) => {
        return item.match_id == match.id && item.match.team_b_id == item.player.team_id
    })
    const teamBPoints = teamBData.reduce((acc: number, item: any) => {
        if (['1 Ponto', '2 Pontos', '3 Pontos'].includes(item.score.score)) {
            let multiplier = 1;
            if (item.score.score === '2 Pontos') multiplier = 2;
            if (item.score.score === '3 Pontos') multiplier = 3;
            return acc + (item.count * multiplier);
        }
        return acc;
    }, 0) || 0;
    const teamBFouls = teamBData.reduce((acc: number, item: any) => {
        if (['Faltas'].includes(item.score.score)) {
            return acc + item.count;
        }
        return acc;
    }, 0) || 0;

    return {
        teamA: {
            points: teamAPoints,
            fouls: teamAFouls,
        },
        teamB: {
            points: teamBPoints,
            fouls: teamBFouls,
        }
    };
};

export const addPlayerScore = async (playerScore: PlayerScore) => {
    const { error: playerScoreError, data: playerScoreData } = await supabase
        .from('player_score')
        .select('*')
        .eq('player_id', playerScore.player_id)
        .eq('match_id', playerScore.match_id)
        .eq('score_id', playerScore.score_id)

    if (playerScoreError)
        throw playerScoreError

    if (playerScoreData && playerScoreData.length) {
        const { data, error } = await supabase
            .from('player_score')
            .update({
                count: playerScoreData[0].count + 1
            })
            .eq('id', playerScoreData[0].id)
            .select();

        if (error) throw error;
        return mapper.mapArray(data as PlayerScore[], 'PlayerScore', 'PlayerScoreModel') as PlayerScore[]
    } else {
        const { data, error } = await supabase
            .from('player_score')
            .insert({
                ...playerScore,
                count: 1
            })
            .select();

        if (error) throw error;
        return mapper.mapArray(data as PlayerScore[], 'PlayerScore', 'PlayerScoreModel') as PlayerScore[]
    }
}

export const getPlayerStatistics = async (userId: string) => {
    const { data, error } = await supabase.rpc('userstatistics', { _user_id: userId });

    if (error) throw error;

    return data;
}

export const getMatchPlayersScores = async (match: Match) => {
    const { data, error } = await supabase
        .rpc('playerscoresformatch', { _match_id: match.id });

    if (error) throw error;

    return data
}