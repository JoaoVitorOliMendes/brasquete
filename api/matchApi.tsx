import { supabase } from './supabase';
import { GroupEvent, Match, MatchModel } from '@/model/models';
import { mapper } from '@/model/mappings/mapper';
import moment from 'moment';
import { User } from '@supabase/supabase-js';
import { getTeamMatchScore } from './playerScoreApi';

/**
 * Inserts a new match into the database.
 * @param match - The match model to insert.
 * @returns The inserted match data.
 */
export const insertMatch = async (match: MatchModel) => {
    const { error: matchError, data: matchData } = await supabase
        .from('match')
        .insert(match)
        .select();

    if (matchError) throw matchError;

    return matchData;
};

/**
 * Adds 30 seconds to the match timer.
 * @param match - The match model to update.
 * @returns The updated match data.
 */
export const add30Seconds = async (match: MatchModel) => {
    const duration = match.duration + moment.duration(30, 'seconds').asMilliseconds();

    const { error, data } = await supabase
        .from('match')
        .update({ duration: duration })
        .eq('id', match.id)
        .select();

    if (error) throw error;

    if (data && data.length) {
        return mapper.mapArray(data as Match[], 'Match', 'MatchModel') as MatchModel[];
    }

    return [];
};

export const add10Minutes = async (match: MatchModel) => {
    const duration = match.duration + moment.duration(10, 'minutes').asMilliseconds();

    const { error, data } = await supabase
        .from('match')
        .update({ duration: duration })
        .eq('id', match.id)
        .select();

    if (error) throw error;

    if (data && data.length) {
        return mapper.mapArray(data as Match[], 'Match', 'MatchModel') as MatchModel[];
    }

    return [];
};

/**
 * Pauses the match timer by adding a pause timestamp.
 * @param match - The match model to update.
 * @returns The updated match data.
 */
export const pauseMatchTimer = async (match: MatchModel) => {

    const { error, data } = await supabase
        .from('match')
        .update({ time_pause: moment(new Date()).toISOString() })
        .eq('id', match.id)
        .select();

    if (error) throw error;

    if (data && data.length) {
        return mapper.mapArray(data as Match[], 'Match', 'MatchModel') as MatchModel[];
    }

    return [];
};

export const startMatchTimer = async (match: MatchModel) => {
    const startTime = moment(match.time_start || new Date())
    const pausedDuration = match.time_pause ? ((match.pause_duration || 0) + moment.duration(moment(new Date()).diff(moment(match.time_pause))).asMilliseconds()) : 0;

    const { error, data } = await supabase
        .from('match')
        .update({ time_start: startTime.toISOString(), time_pause: null, pause_duration: pausedDuration })
        .eq('id', match.id)
        .select();

    if (error) throw error;

    if (data && data.length) {
        return mapper.mapArray(data as Match[], 'Match', 'MatchModel') as MatchModel[];
    }

    return [];
}

export const getMatchById = async (match: Match) => {
    const { data, error } = await supabase
        .from('match')
        .select(`
            *
        `)
        .eq('id', match.id)
        .single();
    if (error) throw error;

    return mapper.map(data, 'Match', 'MatchModel') as MatchModel;
}

export const endMatch = async (match: MatchModel) => {
    const { error, data } = await supabase
        .from('match')
        .update({ time_end: moment(new Date()).toISOString() })
        .eq('id', match.id)
        .select();

    if (error) throw error;

    if (data && data.length) {
        return mapper.mapArray(data as Match[], 'Match', 'MatchModel') as MatchModel[];
    }

    return [];
}

export const getOnGoingMatchForEvent = async (event: GroupEvent) => {
    const { data: onGoingMatchData, error } = await supabase
        .from('match')
        .select(`
            *
        `)
        .eq('event_id', event.id)
    if (error) throw error;

    if (onGoingMatchData && onGoingMatchData.length) {
        const mappedOnGoingMatchData = mapper.mapArray(onGoingMatchData as Match[], 'Match', 'MatchModel') as MatchModel[]
        const activeMatches = mappedOnGoingMatchData.filter((match) => {
            // const startTime = moment(match.time_start || new Date())
            // const pausedDuration = match.time_pause ? ((match.pause_duration || 0) + moment.duration(moment(new Date()).diff(moment(match.time_pause))).asMilliseconds()) : 0;
            // const duration = match.duration + pausedDuration
            // const remainingMs = duration - (moment((match.time_pause ? match.time_pause : new Date())).diff(startTime))
            return match.time_end == ""
        })
        return activeMatches;
    }
    return []
}
export const getClosedMatchesForUser = async (user: User) => {
    const { data, error } = await supabase.rpc('closedmatchresult', {_user_id: user.id})

    if (error) throw error;

    console.log(data)

    if (data && data.length) {
        return data
    }
    return []
}