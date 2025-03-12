import { supabase } from "./supabase";
import { GroupMember, Groups, GroupsModel } from "@/model/models";
import { mapper } from "@/model/mappings/mapper";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./authApi";

export const getGroupsForUser = async (userId: string) => {
  console.log('Query start getGroupsForUser')
  const { data, error } = await supabase
    .from('groups')
    .select(`
    *,
    group_member(*, profiles(*))
  `)
    .eq('admin_id', userId)

  if (error)
    throw error

  if (data && data.length)
    return mapper.mapArray(data as Groups[], 'Groups', 'GroupsModel') as GroupsModel[]
}

export const getGroupsById = async (id: string) => {
  console.log('Query start getGroupsById')
  const { data, error } = await supabase
    .from('groups')
    .select(`
    *,
    location(*),
    group_member(*, profiles(*))
  `)
    .eq('id', id)

  // admin:profiles!admin_id(*),
  if (error)
    throw error

  if (data && data.length)
    return mapper.mapArray(data as Groups[], 'Groups', 'GroupsModel') as GroupsModel[]
}

export const updateGroup = async (group: Groups) => {
  const { error, data } = await supabase
    .from('groups')
    .update(group)
    .eq('id', group.id)
    .select()

  if (error)
    throw error
  
  if (data && data.length)
    return mapper.mapArray(data as Groups[], 'Groups', 'GroupsModel') as GroupsModel[]
}

export const insertGroup = async (group: Groups) => {
  const { error, data } = await supabase
    .from('groups')
    .insert(group)
    .select()

  if (error)
    throw error

  if (data && data.length)
    return mapper.mapArray(data as Groups[], 'Groups', 'GroupsModel') as GroupsModel[]
}

export const deleteGroup = async (group: Groups) => {
  const { error, data } = await supabase
    .from('groups')
    .delete()
    .eq('id', group.id)

  if (error)
    throw error
  else
    return true
}