import { supabase } from '@/api/supabase';
import { Database, Tables } from '@/model/supabaseTypes';

export type Modify<T, R> = Omit<T, keyof R> & R & Omit<T, 'created_at' | 'updated_at'> & { created_at: Date; updated_at: Date };

export type Score = Tables<'score'>
export type Motives = Tables<'motives'>
export type Location = Tables<'location'>
export type Profiles = Tables<'profiles'>
export type Group = Tables<'groups'> & {
    profiles: Profiles,
    location: Location
}

export type Event = Tables<'event'> & {
    groups: Group
}
export type EventModel = Modify<Event, {
    date: Date
}>

export type Team = Tables<'team'> & {
    event: Event
}
export type GroupMember = Tables<'group_member'> & {
    groups: Group,
    profiles: Profiles
}
export type Match = Tables<'match'> & {
    event: Event
}
export type Player = Tables<'player'> & {
    team: Team,
    event: Event,
    group_member: GroupMember
}
export type PlayerScore = Tables<'player_score'> & {
    score: Score,
    profiles: Profiles,
    match: Match
}
export type Report = Tables<'report'>
export type ReportMotive = Tables<'report_motive'> & {
    report: Report,
    motive: Motives
}

export type Views<T extends keyof Database['public']['Views']> =
  Database['public']['Views'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

export type Insert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type Functions = Database['public']['Functions']

export type MetadataField = {
    documentMetadata: {
        sourceUrl: string
        otherField: string
    }
    defaultMetadata: unknown
}

export type MetadataFieldMapping = {
    [k in keyof Functions]: string
}

export type RPC = {
    [FunctionName in keyof MetadataFieldMapping]: {
        Args: Functions[FunctionName]['Args']
        Returns: Array<
            Functions[FunctionName]['Returns'][number] & {
                metadata: MetadataField[MetadataFieldMapping[FunctionName] extends keyof MetadataField
                ? MetadataFieldMapping[FunctionName]
                : 'defaultMetadata'] // Fallback to 'defaultMetadata' if the mapping does not exist
            }
        >
    }
}

export async function supabaseRPC<
    MethodName extends keyof MetadataFieldMapping
>(methodName: MethodName, args: RPC[MethodName]['Args']) {
    return supabase.rpc<MethodName, RPC[MethodName]>(methodName, args)
}
