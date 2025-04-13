import { supabase } from "./supabase";
import { GroupMember, Groups, GroupsModel } from "@/model/models";
import { mapper } from "@/model/mappings/mapper";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./authApi";

export const getAvailableGroups = async (userId: string) => {
  
  const { data, error } = await supabase
    .from('groups')
    .select(`
    *,
    group_member(*, profiles(*))
  `)
    .eq('private', false)

  if (error)
    throw error

  if (data && data.length) {
    const validatedData = data.filter((item) => {
      return (item.admin_id!=userId && !(item.group_member.find((item) => item.user_id==userId && item.status!=1)))
    })
    return mapper.mapArray(validatedData as Groups[], 'Groups', 'GroupsModel') as GroupsModel[]
  }
  return []
}

export const getGroupsForUser = async (userId: string) => {
  
  const { data, error } = await supabase
    .from('groups')
    .select(`
    *,
    group_member(*, profiles(*))
  `)

  if (error)
    throw error

  if (data && data.length) {
    const validatedData = data.filter((item) => {
      return (item.admin_id==userId || item.group_member.find((item) => item.user_id==userId && item.status!=1))
    })
    return mapper.mapArray(validatedData as Groups[], 'Groups', 'GroupsModel') as GroupsModel[]
  }
  return []
}

export const getGroupsById = async (id: string) => {
  const { data, error } = await supabase
    .from('groups')
    .select(`
    *,
    location(*),
    group_member(*, profiles(*))
  `)
    .eq('id', id)
    .single()

  // admin:profiles!admin_id(*),
  if (error)
    throw error

  if (data){
    const validatedData = data.group_member.filter((item) => {
      return item.status!=1
    })
    data.group_member = validatedData
    return mapper.map(data as Groups, 'Groups', 'GroupsModel') as GroupsModel
  }
  return null
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
  return []
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
  return []
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