import { useMutation, useQuery } from "react-query"
import { supabase } from "./supabase";

// RLS policy controls so user can only see own records
const getGroupMemberForUser = async () => {
  const { data, error } = await supabase
  .from('group_member')
  .select(`
    *
  `)

  if (error)
    throw error
  return data
}

export default function useGetGroupMemberForUser() {
  return useQuery({
    queryKey: ['groupMember'],
    queryFn: () => getGroupMemberForUser()
  })
}
