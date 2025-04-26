import { mapper } from '@/model/mappings/mapper';
import { supabase } from './supabase';
import { Match, PlayerScore, Team } from '@/model/models';

export const getTeamMatchScore = async (match: Match) => {
    const { data, error } = await supabase
        .from('player_score')
        .select(`
        *,
        score(*),
        match(
            *,
            team_a:team!team_a_id(*),
            team_b:team!team_b_id(*)
        ),
        player(*)
    `)
    console.log('getTeamMatchScore', data);

    const teamAPoints = data?.filter((item: any) => item.match_id == match.id && item.team_a.id != null).reduce((acc: number, item: any) => {
        if (['1 Ponto', '2 Pontos', '3 Pontos'].includes(item.score.score)) {
            let multiplier = 1;
            if (item.score.score === '2 Pontos') multiplier = 2;
            if (item.score.score === '3 Pontos') multiplier = 3;
            return acc + (item.count * multiplier);
        }
        return acc;
    } , 0) || 0;
    const teamBPoints = data?.filter((item: any) => item.match_id == match.id && item.team_b.id != null).reduce((acc: number, item: any) => {
        if (['1 Ponto', '2 Pontos', '3 Pontos'].includes(item.score.score)) {
            let multiplier = 1;
            if (item.score.score === '2 Pontos') multiplier = 2;
            if (item.score.score === '3 Pontos') multiplier = 3;
            return acc + (item.count * multiplier);
        }
        return acc;
    } , 0) || 0;

    if (error)
        throw error;

    return {
        teamA: teamAPoints,
        teamB: teamBPoints
    };
};

export const addPlayerScore = async (playerScore: PlayerScore) => {
    const { data, error } = await supabase
        .from('player_score')
        .insert(playerScore)
        .select();

    if (error) throw error;

    return mapper.mapArray(data as PlayerScore[], 'PlayerScore', 'PlayerScoreModel') as PlayerScore[]
}