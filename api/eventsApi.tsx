import { supabase } from "./supabase";
import { GroupEventModel } from "@/model/models";
import Toast from "react-native-toast-message";
import { GroupEvent } from '@/model/models'
import { mapper } from "@/model/mappings/mapper";

export const getEventsForGroups = async () => {
  
  const today = new Date().toISOString()
  const { data, error } = await supabase
  .from('event')
    .select(`
    *,
    groups(
      *,
      location(*)
    )
  `)
  .gt('date', today)
  .neq('status', 2)

  if (error)
    Toast.show({ type: 'error', text1: 'Error', text2: error.message })

  
  if (data && data.length)
    return mapper.mapArray(data as GroupEvent[], 'GroupEvent', 'GroupEventModel') as GroupEventModel[]
  return []
}

export const getEventByid = async (id: string) => {
  const { data, error } = await supabase
  .from('event')
    .select(`
    *,
    groups(
      *,
      group_member(
        *,
        profiles(*)
      ),
      location(*)
    )
  `)
  .eq('id', id)
  .single()

  if (error)
    Toast.show({ type: 'error', text1: 'Error', text2: error.message })

  if (data)
    return mapper.map(data as GroupEvent, 'GroupEvent', 'GroupEventModel') as GroupEventModel
  return null
}

export const insertEvent = async (event: GroupEvent) => {
  
  const { data, error } = await supabase
  .from('event')
  .insert(event)
  .select()

  if (error)
    Toast.show({ type: 'error', text1: 'Error', text2: error.message })

  if (data && data.length)
    return mapper.mapArray(data as GroupEvent[], 'GroupEvent', 'GroupEventModel') as GroupEventModel[]
  return []
}

export const changeEventStatus = async (event: GroupEvent) => {
  
  const { data, error } = await supabase
  .from('event')
  .update({
    status: event.status
  })
  .eq('id', event.id)
  .select()

  if (error)
    Toast.show({ type: 'error', text1: 'Error', text2: error.message })

  if (data && data.length)
    return mapper.mapArray(data as GroupEvent[], 'GroupEvent', 'GroupEventModel') as GroupEventModel[]
  return []
}