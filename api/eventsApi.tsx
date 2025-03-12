import { supabase } from "./supabase";
import { GroupEventModel } from "@/model/models";
import Toast from "react-native-toast-message";
import { GroupEvent } from '@/model/models'
import { mapper } from "@/model/mappings/mapper";

export const getEventsForGroups = async () => {
  console.log('Query start getEventsForGroups')
  const { data, error } = await supabase
  .from('event')
    .select(`
    *,
    groups(*)
  `)

  if (error)
    Toast.show({ type: 'error', text1: 'Error', text2: error.message })

  console.log('Query finish getEventsForGroups', data)
  if (data && data.length)
    return mapper.mapArray(data as GroupEvent[], 'GroupEvent', 'GroupEventModel') as GroupEventModel[]
}

export const insertEvent = async (event: GroupEvent) => {
  console.log('Query start createEvent')
  const { data, error } = await supabase
  .from('event')
  .insert(event)
  .select()

  if (error)
    Toast.show({ type: 'error', text1: 'Error', text2: error.message })

  console.log('Query finish createEvent', data)
  if (data && data.length)
    return mapper.mapArray(data as GroupEvent[], 'GroupEvent', 'GroupEventModel') as GroupEventModel[]
}