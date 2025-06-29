import { supabase } from "./supabase";
import { GroupEventModel, GroupMember } from "@/model/models";
import Toast from "react-native-toast-message";
import { GroupEvent } from '@/model/models'
import { mapper } from "@/model/mappings/mapper";
import { changeStatusGroupMember, unconfirmGroupMemberForEvent } from "./groupMemberApi";
import { getGroupsById } from "./groupsApi";

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
  const groupMembers = await unconfirmGroupMemberForEvent(event)
  if (groupMembers && groupMembers.length) {
    const group = await getGroupsById(event.group_id)
    if (group && group.group_member?.length) {
      const adminGroupMember = group.group_member.find((item) => item.user_id === group.admin_id)
      if (adminGroupMember) {
        await changeStatusGroupMember({
          confirmed: 1,
          id: adminGroupMember?.id || '',
        } as GroupMember)
        const { data, error } = await supabase
        .from('event')
        .insert(event)
        .select()
      
        if (error)
          Toast.show({ type: 'error', text1: 'Error', text2: error.message })
      
        if (data && data.length)
          return mapper.mapArray(data as GroupEvent[], 'GroupEvent', 'GroupEventModel') as GroupEventModel[]
      }
    }
  }
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

export const getEventByGroupId = async (id: string) => {
  const today = new Date().toISOString()

  const { data, error } = await supabase
  .from('event')
    .select(`
    *
  `)
  .eq('group_id', id)
  .gt('date', today)
  .neq('status', 2)

  if (error)
    Toast.show({ type: 'error', text1: 'Error', text2: error.message })

  if (data) {
    return mapper.mapArray(data as GroupEvent[], 'GroupEvent', 'GroupEventModel') as GroupEventModel[]
  }
  return null
}