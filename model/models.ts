import { supabase } from '@/api/supabase';
import { Database, Tables } from '@/model/supabaseTypes';

export type Modify<T, R> = Omit<T, keyof R> & R & Omit<T, 'created_at' | 'updated_at'> & { created_at: Date; updated_at: Date };

export type Score = Tables<'score'>
export type ScoreModel = Modify<Score, {}>

export type Motives = Tables<'motives'>
export type MotivesModel = Modify<Motives, {}>

export type Location = Tables<'location'>
export type LocationModel = Modify<Location, {}>

export type Profiles = Tables<'profiles'>
export type ProfilesModel = Modify<Profiles, {
    birth_date: Date
}>

export type Groups = Tables<'groups'> & {
    admin?: Profiles,
    location?: Location,
    group_member?: GroupMember[]
}
export type GroupsModel = Modify<Groups, {}>

export type GroupEvent = Tables<'event'> & {
    groups?: Groups,
    player?: Player[]
}
export type GroupEventModel = Modify<GroupEvent, {
    date: Date
}>

export type Team = Tables<'team'> & {
    event?: GroupEvent,
    player?: Player[]
}
export type TeamModel = Modify<Team, {}>

export type GroupMember = Tables<'group_member'> & {
    groups?: Groups,
    profiles?: Profiles
}
export type GroupMemberModel = Modify<GroupMember, {}>

export type Match = Tables<'match'> & {
    event: GroupEvent,
    team_a: Team,
    team_b: Team
}
export type MatchModel = Modify<Match, {
    time_pause: Date,
    time_start: Date
    time_end: Date,
}>

export type Player = Tables<'player'> & {
    group_member?: GroupMember
}
export type PlayerModel = Modify<Player, {}>

export type PlayerScore = Tables<'player_score'> & {
    score?: Score,
    player?: Player,
    match?: Match
}
export type PlayerScoreModel = Modify<PlayerScore, {}>

export type Report = Tables<'report'> & {
    created_byReg?: Profiles,
    targetReg?: Profiles
}
export type ReportModel = Modify<Report, {}>

export type ReportMotive = Tables<'report_motive'> & {
    report?: Report,
    motive?: Motives
}
export type ReportMotiveModel = Modify<ReportMotive, {}>



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

// export type RPC = {
//     [FunctionName in keyof MetadataFieldMapping]: {
//         Args: Functions[FunctionName]['Args']
//         Returns: Array<
//             Functions[FunctionName]['Returns'][number] & {
//                 metadata: MetadataField[MetadataFieldMapping[FunctionName] extends keyof MetadataField
//                 ? MetadataFieldMapping[FunctionName]
//                 : 'defaultMetadata'] // Fallback to 'defaultMetadata' if the mapping does not exist
//             }
//         >
//     }
// }

// export async function supabaseRPC<
//     MethodName extends keyof MetadataFieldMapping
// >(methodName: MethodName, args: RPC[MethodName]['Args']) {
//     return supabase.rpc<MethodName, RPC[MethodName]>(methodName, args)
// }
