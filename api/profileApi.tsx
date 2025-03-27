import { User } from "@supabase/supabase-js"
import { supabase } from "./supabase"
import { Profiles } from "@/model/models"

// export const uploadProfilePic = async (user: User, file: ) => {
//   const { error, data } = await supabase
//   .storage
//   .from('profile_pic')
//   .upload(user.id + '/' )

//   if (error)
//     throw error

//   if (data && data.length)
//     return mapper.mapArray(data as Location[], 'Location', 'LocationModel') as LocationModel[]
// }

export const upsertExpoToken = async (user: Profiles) => {
  console.log('mutate upsertExpoToken', user)
  const { error, data } = await supabase  
  .from('profiles')
  .update({ expo_push_token: user.expo_push_token })
  .eq('id', user.id)

  if (error)
    throw error
  else
    return true
}