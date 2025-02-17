import { useMutation, useQuery } from "react-query"
import { supabase } from "./supabase";
import { Group } from "@/model/models";

const getGroupsByid = async (groupsid: Group['id'][]) => {
  const { data, error } = await supabase
  .from('groups')
  .select(`
    *
  `)
  .in('id', groupsid)

  if (error)
    throw error
  return data
}

export default function useGetGroupsByid(groupsid: Group['id'][]) {
  return useQuery({
    queryKey: ['groups', groupsid],
    queryFn: () => getGroupsByid(groupsid)
  })
}
