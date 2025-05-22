import { supabase } from "./supabase";
import { GroupEvent, GroupMember, GroupMemberModel } from "@/model/models";
import { mapper } from "@/model/mappings/mapper";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./authApi";

export const insertGroupMember = async (groupMember: GroupMember) => {
  const { error: groupMemberError, data: groupMemberData } = await supabase
    .from('group_member')
    .select('*')
    .eq('user_id', groupMember.user_id)
    .eq('group_id', groupMember.group_id)

  if (groupMemberError)
    throw groupMemberError

  console.log(groupMemberData)

  if (groupMemberData && groupMemberData[0]) {
    const { error, data } = await supabase
      .from('group_member')
      .update({
        status: 0
      })
      .eq('id', groupMemberData[0].id)
      .select()

    if (error)
      throw error

    if (data && data.length)
      return mapper.mapArray(data as GroupMember[], 'GroupMember', 'GroupMemberModel') as GroupMemberModel[]
  } else {
    const { error, data } = await supabase
      .from('group_member')
      .insert(groupMember)
      .select()

    if (error)
      throw error

    if (data && data.length)
      return mapper.mapArray(data as GroupMember[], 'GroupMember', 'GroupMemberModel') as GroupMemberModel[]
  }

  return []
}

export const changeStatusGroupMember = async (groupMember: GroupMember) => {
  const { error, data } = await supabase
    .from('group_member')
    .update({
      confirmed: groupMember.confirmed
    })
    .eq('id', groupMember.id)
    .select()

  

  if (error)
    throw error

  

  if (data && data.length)
    return mapper.mapArray(data as GroupMember[], 'GroupMember', 'GroupMemberModel') as GroupMemberModel[]

  return []
}

export const unconfirmGroupMemberForEvent = async (event: GroupEvent) => {
  const { error, data } = await supabase
    .from('group_member')
    .update({
      confirmed: 0
    })
    .eq('group_id', event.group_id)
    .select()

  

  if (error)
    throw error

  

  if (data && data.length)
    return mapper.mapArray(data as GroupMember[], 'GroupMember', 'GroupMemberModel') as GroupMemberModel[]

  return []
}

export const deleteGroupMember = async (groupMember: GroupMember) => {
  
  const { error, data } = await supabase
    .from('group_member')
    .update({
      status: 1
    })
    .eq('id', groupMember.id)

  if (error)
    throw error
  else
    return true
}