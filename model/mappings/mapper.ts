import { createMap, createMapper, forMember, mapFrom, typeConverter } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos'
import { GroupEvent, GroupEventModel, GroupMember, GroupMemberModel, Groups, GroupsModel, Location, LocationModel, Match, MatchModel, Motives, MotivesModel, Player, PlayerModel, PlayerScore, PlayerScoreModel, Profiles, ProfilesModel, ReportMotive, ReportMotiveModel, Score, ScoreModel, Team, TeamModel } from '../models';

export const mapper = createMapper({
    strategyInitializer: pojos()
})

PojosMetadataMap.create<Score>('Motives', {
    created_at: String,
    id: String,
    score: String,
    updated_at: String,
});
PojosMetadataMap.create<ScoreModel>('MotivesModel', {
    created_at: Date,
    id: String,
    score: String,
    updated_at: Date
});

PojosMetadataMap.create<Motives>('Motives', {
    created_at: String,
    id: String,
    motive: String,
    updated_at: String
});
PojosMetadataMap.create<MotivesModel>('MotivesModel', {
    created_at: Date,
    id: String,
    motive: String,
    updated_at: Date
});

PojosMetadataMap.create<Location>('Location', {
    add_city: String,
    add_country: String,
    add_neighborhood: String,
    add_number: String,
    add_state: String,
    add_street: String,
    created_at: String,
    id: String,
    latitude: Number,
    longitude: Number,
    updated_at: String
});
PojosMetadataMap.create<LocationModel>('LocationModel', {
    add_city: String,
    add_country: String,
    add_neighborhood: String,
    add_number: String,
    add_state: String,
    add_street: String,
    created_at: Date,
    id: String,
    latitude: Number,
    longitude: Number,
    updated_at: Date
});

PojosMetadataMap.create<ProfilesModel>('ProfilesModel', {
    birth_date: Date,
    first_name: String,
    height: Number,
    id: String,
    last_name: String,
    position: String
});

PojosMetadataMap.create<Profiles>('Profiles', {
    birth_date: String,
    first_name: String,
    height: Number,
    id: String,
    last_name: String,
    position: String
});
PojosMetadataMap.create<ProfilesModel>('ProfilesModel', {
    birth_date: Date,
    first_name: String,
    height: Number,
    id: String,
    last_name: String,
    position: String
});

PojosMetadataMap.create<Groups>('Groups', {
    admin: 'Profiles',
    admin_id: Number,
    created_at: String,
    id: String,
    level: Number,
    location: 'Location',
    location_id: Number,
    name: String,
    private: Boolean,
    updated_at: String,
    group_member: ['GroupMember']
});
PojosMetadataMap.create<GroupsModel>('GroupsModel', {
    admin: 'Profiles',
    admin_id: Number,
    created_at: Date,
    id: String,
    level: Number,
    location: 'Location',
    location_id: Number,
    name: String,
    private: Boolean,
    updated_at: Date,
    group_member: ['GroupMember']
});

PojosMetadataMap.create<GroupEvent>('GroupEvent', {
    id: String,
    created_at: String,
    updated_at: String,
    date: String,
    group_id: String,
    status: Number,
    groups: 'Groups'
});
PojosMetadataMap.create<GroupEventModel>('GroupEventModel', {
    id: String,
    created_at: Date,
    updated_at: Date,
    date: Date,
    group_id: String,
    status: Number,
    groups: 'Groups'
});

PojosMetadataMap.create<Team>('Team', {
    id: String,
    status: Number,
    created_at: String,
    updated_at: String,
    event_id: String,
    event: 'GroupEvent',
    player: 'Player',
    name: String
});
PojosMetadataMap.create<TeamModel>('TeamModel', {
    id: String,
    status: Number,
    created_at: Date,
    updated_at: Date,
    event_id: String,
    event: 'GroupEvent',
    player: 'Player',
    name: String
});

PojosMetadataMap.create<GroupMember>('GroupMember', {
    id: String,
    created_at: String,
    updated_at: String,
    confirmed: Number,
    group_id: String,
    groups: 'Groups',
    profiles: 'Profiles',
    user_id: String
});
PojosMetadataMap.create<GroupMemberModel>('GroupMemberModel', {
    id: String,
    created_at: Date,
    updated_at: Date,
    confirmed: Number,
    group_id: String,
    groups: 'Groups',
    profiles: 'Profiles',
    user_id: String
});

PojosMetadataMap.create<Match>('Match', {
    id: String,
    created_at: String,
    updated_at: String,
    event: 'Event',
    event_id: String,
    time_pause: String,
    time_start: String,
    team_a: 'Team',
    team_a_id: String,
    team_b: 'Team',
    team_b_id: String,
    duration: Number,
    pause_duration: Number,
    time_end: String
});
PojosMetadataMap.create<MatchModel>('MatchModel', {
    id: String,
    created_at: Date,
    updated_at: Date,
    event: 'Event',
    event_id: String,
    time_pause: Date,
    time_start: Date,
    team_a: 'Team',
    team_a_id: String,
    team_b: 'Team',
    team_b_id: String,
    duration: Number,
    pause_duration: Number,
    time_end: Date
});

PojosMetadataMap.create<Player>('Player', {
    id: String,
    status: Number,
    created_at: String,
    updated_at: String,
    event_id: String,
    group_member: 'GroupMember',
    group_member_id: String,
    position: String,
    team_id: String
});
PojosMetadataMap.create<PlayerModel>('PlayerModel', {
    id: String,
    status: Number,
    created_at: Date,
    updated_at: Date,
    event_id: String,
    group_member: 'GroupMember',
    group_member_id: String,
    position: String,
    team_id: String
});

PojosMetadataMap.create<PlayerScore>('PlayerScore', {
    id: String,
    created_at: String,
    updated_at: String,
    count: Number,
    match: 'Match',
    match_id: String,
    player: 'Player',
    score: 'Score',
    score_id: String,
    player_id: String,
});
PojosMetadataMap.create<PlayerScoreModel>('PlayerScoreModel', {
    id: String,
    created_at: Date,
    updated_at: Date,
    count: Number,
    match: 'Match',
    match_id: String,
    player: 'Player',
    score: 'Score',
    score_id: String,
    player_id: String,
});

PojosMetadataMap.create<ReportMotive>('PlayerScore', {
    id: String,
    created_at: String,
    updated_at: String,
    motive: 'Motive',
    motive_id: String,
    report: 'Report',
    report_id: String
});
PojosMetadataMap.create<ReportMotiveModel>('ReportMotiveModel', {
    id: String,
    created_at: Date,
    updated_at: Date,
    motive: 'Motive',
    motive_id: String,
    report: 'Report',
    report_id: String
});

PojosMetadataMap.create<Score>('Score', {
    created_at: String,
    id: String,
    score: String,
    updated_at: String,
});
PojosMetadataMap.create<ScoreModel>('ReportMotiveModel', {
    created_at: Date,
    id: String,
    score: String,
    updated_at: Date
});

createMap<Location, LocationModel>(
    mapper,
    'Location',
    'LocationModel',
    forMember(
        (destination) => destination.created_at,
        mapFrom(
            (source) => new Date(source.created_at)
        )
    ),
    forMember(
        (destination) => destination.updated_at,
        mapFrom(
            (source) => source.updated_at ? new Date(source.updated_at) : null
        )
    )
)

createMap<Profiles, ProfilesModel>(
    mapper,
    'Profiles',
    'ProfilesModel',
    forMember(
        (destination) => destination.birth_date,
        mapFrom(
            (source) => source.birth_date ? new Date(source.birth_date) : null
        )
    )
)

createMap<Groups, GroupsModel>(
    mapper,
    'Groups',
    'GroupsModel',
    forMember(
        (destination) => destination.created_at,
        mapFrom(
            (source) => new Date(source.created_at)
        )
    ),
    forMember(
        (destination) => destination.updated_at,
        mapFrom(
            (source) => source.updated_at ? new Date(source.updated_at) : null
        )
    ),
    forMember(
        (destination) => destination.group_member,
        mapFrom(
            (source) => source.group_member as unknown as GroupMember[]
        )
    )
)

createMap<GroupEvent, GroupEventModel>(
    mapper,
    'GroupEvent',
    'GroupEventModel',
    forMember(
        (destination) => destination.created_at,
        mapFrom(
            (source) => new Date(source.created_at)
        )
    ),
    forMember(
        (destination) => destination.updated_at,
        mapFrom(
            (source) => source.updated_at ? new Date(source.updated_at) : ''
        )
    ),
    forMember(
        (destination) => destination.date,
        mapFrom(
            (source) => new Date(source.date)
        )
    )
)

createMap<GroupMember, GroupMemberModel>(
    mapper,
    'GroupMember',
    'GroupMemberModel',
    forMember(
        (destination) => destination.created_at,
        mapFrom(
            (source) => new Date(source.created_at)
        )
    ),
    forMember(
        (destination) => destination.updated_at,
        mapFrom(
            (source) => source.updated_at ? new Date(source.updated_at) : ''
        )
    ),
    forMember(
        (destination) => destination.groups,
        mapFrom(
            (source) => source.groups as unknown as Groups
        )
    )
)

createMap<Team, TeamModel>(
    mapper,
    'Team',
    'TeamModel',
    forMember(
        (destination) => destination.created_at,
        mapFrom(
            (source) => new Date(source.created_at)
        )
    ),
    forMember(
        (destination) => destination.updated_at,
        mapFrom(
            (source) => source.updated_at ? new Date(source.updated_at) : ''
        )
    )
)

createMap<Player, PlayerModel>(
    mapper,
    'Player',
    'PlayerModel',
    forMember(
        (destination) => destination.created_at,
        mapFrom(
            (source) => new Date(source.created_at)
        )
    ),
    forMember(
        (destination) => destination.updated_at,
        mapFrom(
            (source) => source.updated_at ? new Date(source.updated_at) : ''
        )
    )
)

createMap<Score, ScoreModel>(
    mapper,
    'Score',
    'ScoreModel',
    forMember(
        (destination) => destination.created_at,
        mapFrom(
            (source) => new Date(source.created_at)
        )
    ),
    forMember(
        (destination) => destination.updated_at,
        mapFrom(
            (source) => source.updated_at ? new Date(source.updated_at) : ''
        )
    )
)

createMap<Match, MatchModel>(
    mapper,
    'Match',
    'MatchModel',
    forMember(
        (destination) => destination.created_at,
        mapFrom(
            (source) => new Date(source.created_at)
        )
    ),
    forMember(
        (destination) => destination.updated_at,
        mapFrom(
            (source) => source.updated_at ? new Date(source.updated_at) : ''
        )
    ),
    forMember(
        (destination) => destination.time_end,
        mapFrom(
            (source) => source.time_end ? new Date(source.time_end) : ''
        )
    ),
    forMember(
        (destination) => destination.time_pause,
        mapFrom(
            (source) => source.time_pause ? new Date(source.time_pause) : ''
        )
    ),
    forMember(
        (destination) => destination.time_start,
        mapFrom(
            (source) => source.time_start ? new Date(source.time_start) : ''
        )
    )
)

createMap<PlayerScore, PlayerScoreModel>(
    mapper,
    'PlayerScore',
    'PlayerScoreModel',
    forMember(
        (destination) => destination.created_at,
        mapFrom(
            (source) => new Date(source.created_at)
        )
    ),
    forMember(
        (destination) => destination.updated_at,
        mapFrom(
            (source) => source.updated_at ? new Date(source.updated_at) : ''
        )
    )
)