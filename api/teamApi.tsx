import { supabase } from "./supabase";
import { GroupEvent, Player, PlayerModel, Team, TeamModel } from "@/model/models";
import { mapper } from "@/model/mappings/mapper";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./authApi";

export const insertTeam = async (team: Team) => {
  const players = team.player
  delete team.player
  const { error: teamError, data: teamData } = await supabase
    .from('team')
    .insert(team)
    .select()
    .single()

  if (teamError)
    throw teamError

  if (teamData && players) {
    players.forEach((player) => {
      player.team_id = teamData.id
      player.event_id = teamData.event_id
    })
    const { error: playerError, data: playerData } = await supabase
      .from('player')
      .insert(players)
      .select()

    if (playerError)
      throw playerError

    if (playerData && playerData.length)
      return mapper.map((teamData as Team).player = playerData, 'Team', 'TeamModel') as TeamModel
  }

  return []
}

export const updateTeam = async (team: Team) => {
  const players = team.player
  delete team.player
  const { error: teamError, data: teamData } = await supabase
    .from('team')
    .update(team)
    .eq('id', team.id)
    .select()
    .single()

  if (teamError)
    throw teamError

  if (teamData && players) {
    players.forEach((player) => {
      player.team_id = teamData.id
      player.event_id = teamData.event_id
    })
    const { error: playerError, data: playerData } = await supabase
      .from('player')
      .upsert(players, { defaultToNull: false })
      .select()

    if (playerError)
      throw playerError

    if (playerData)
      return mapper.map((teamData as Team).player = playerData, 'Team', 'TeamModel') as TeamModel
  }

  return []
}

export const deleteTeam = async (team: Team) => {
  const players = team.player
  delete team.player
  team.status = 1
  const { error: teamError, data: teamData } = await supabase
    .from('team')
    .update(team)
    .eq('id', team.id)
    .select()
    .single()

  if (teamError)
    throw teamError

  if (teamData && players) {
    players.forEach((player) => {
      player.team_id = teamData.id
      player.event_id = teamData.event_id
      player.status = 1
    })
    const { error: playerError, data: playerData } = await supabase
      .from('player')
      .upsert(players, { defaultToNull: false })
      .select()

    if (playerError)
      throw playerError

    if (playerData)
      return mapper.map((teamData as Team).player = playerData, 'Team', 'TeamModel') as TeamModel
  }

  return []
}

export const getTeamsForEvent = async (event: GroupEvent) => {
  const { data, error } = await supabase
    .from('team')
    .select(`
      *,
      player(*)
    `)
    .eq('event_id', event.id)

  if (error)
    throw error

  if (data) {
    // const validatedData = data.group_member.filter((item) => {
    //   return item.status != 1
    // })
    // data.group_member = validatedData
    return mapper.mapArray(data as Team[], 'Team', 'TeamModel') as TeamModel[]
  }
  return null
}

export const getTeamById = async (team: Team) => {
  const { data, error } = await supabase
    .from('team')
    .select(`
      *,
      player(
        *,
        group_member(
        *,
        profiles(*)
        )
      )
    `)
    .eq('id', team.id)
    .single()

  if (error)
    throw error

  if (data) {
    return mapper.map(data as Team, 'Team', 'TeamModel') as TeamModel
  }
  return null
}