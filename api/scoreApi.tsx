import { mapper } from '@/model/mappings/mapper';
import { supabase } from './supabase';
import { PlayerScore, Score, ScoreModel } from '@/model/models';

/**
 * Inserts a new score into the database.
 * @param score - The score object to insert.
 * @returns The inserted score data.
 */
export const getScores = async () => {
  const { data, error } = await supabase
    .from('score')
    .select('*')
  if (error)
    throw error;
  // console.log('getScores', mapper.mapArray(data as Score[], 'Score', 'ScoreModel') as ScoreModel[])
  console.log('getScores', data as Score[])

  return data as Score[];
};