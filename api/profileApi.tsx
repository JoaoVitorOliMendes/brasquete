import { User } from "@supabase/supabase-js"
import { supabase } from "./supabase"

export const uploadProfilePic = async (user: User, file: ) => {
  const { error, data } = await supabase
  .storage
  .from('profile_pic')
  .upload(user.id + '/' )

  if (error)
    throw error

  if (data && data.length)
    return mapper.mapArray(data as Location[], 'Location', 'LocationModel') as LocationModel[]
}