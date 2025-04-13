import { supabase } from "./supabase";
import { GroupEvent, Player, PlayerModel } from "@/model/models";
import { mapper } from "@/model/mappings/mapper";

export const getPlayersForEvent = async (event: GroupEvent) => {
  const { data, error } = await supabase
    .from('player')
    .select(`
      *
    `)
    .eq('event_id', event.id)
  
  if (error)
    throw error

  if (data) {
    // const validatedData = data.group_member.filter((item) => {
    //   return item.status != 1
    // })
    // data.group_member = validatedData
    return mapper.mapArray(data as Player[], 'Player', 'PlayerModel') as PlayerModel[]
  }
  return null
}