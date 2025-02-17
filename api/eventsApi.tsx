import { useMutation, useQuery } from "react-query"
import { supabase } from "./supabase";
import { Group } from "@/model/models";
import { User } from "@supabase/supabase-js";
import Toast from "react-native-toast-message";

const getEventsForGroups = async () => {
  console.log('Query start getEventsForGroups')
  const { data, error } = await supabase.from('event')
    .select(`
    *,
    groups(*)
  `)

  if (error)
    Toast.show({ type: 'error', text1: 'Error', text2: error.message })
  return data
}

export default function useGetEventsForGroups() {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => getEventsForGroups()
  })
}
