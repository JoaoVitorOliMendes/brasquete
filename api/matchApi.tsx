import { supabase } from './supabase';
import { Match, MatchModel } from '@/model/models';
import { mapper } from '@/model/mappings/mapper';
import moment from 'moment';

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
    const endDate = moment(match.time_end).add(30, 'seconds').toDate();
    match.time_end = endDate;

    const { error, data } = await supabase
        .from('match')
        .update({ time_end: match.time_end })
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
    const now = new Date();
    match.time_pause = now;

    const { error, data } = await supabase
        .from('match')
        .update({ time_pause: match.time_pause.toISOString() })
        .eq('id', match.id)
        .select();

    if (error) throw error;

    if (data && data.length) {
        return mapper.mapArray(data as Match[], 'Match', 'MatchModel') as MatchModel[];
    }

    return [];
};

export const startMatchTimer = async (match: MatchModel) => {
    const startTime = moment(match.time_start)
    const pauseTime = moment(match.time_pause)
    const endTime = moment(match.time_pause).add(600000 - moment.duration(startTime.diff(pauseTime)).asMilliseconds(), 'milliseconds').toDate()

    const { error, data } = await supabase
        .from('match')
        .update({ time_end: endTime.toISOString(), time_pause: null })
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