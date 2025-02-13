import { Tables } from '@/model/supabaseTypes';

export type Event = Tables<'event'>;
export type Group = Tables<'group'>;
export type GroupMember = Tables<'group_member'>;
export type Location = Tables<'location'>;
export type Match = Tables<'match'>;
export type Motives = Tables<'motives'>;
export type Player = Tables<'player'>;
export type PlayerScore = Tables<'player_score'>;
export type Profiles = Tables<'profiles'>;
export type Report = Tables<'report'>;
export type ReportMotive = Tables<'report_motive'>;
export type Score = Tables<'score'>;
export type Team = Tables<'team'>;
export type UserMatch = Tables<'user_match'>;