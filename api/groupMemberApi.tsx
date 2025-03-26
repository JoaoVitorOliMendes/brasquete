import { supabase } from "./supabase";
import { GroupMember, GroupMemberModel } from "@/model/models";
import { mapper } from "@/model/mappings/mapper";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./authApi";

export const insertGroupMember = async (groupMember: GroupMember) => {
  const { error, data } = await supabase
    .from('group_member')
    .insert(groupMember)
    .select()

  if (error)
    throw error

  if (data && data.length)
    return mapper.mapArray(data as GroupMember[], 'GroupMember', 'GroupMemberModel') as GroupMemberModel[]
  return []
}

export const deleteGroupMember = async (groupMember: GroupMember) => {
  console.log('Query start deleteGroupMember')
  const { error, data } = await supabase
    .from('group_member')
    .delete()
    .eq('id', groupMember.id)

  if (error)
    throw error
  else
    return true
}