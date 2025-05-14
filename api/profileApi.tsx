import { User } from "@supabase/supabase-js"
import { supabase } from "./supabase"
import { Profiles } from "@/model/models"
import { RegisterForm } from "@/model/RegisterForm"

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
  const { error, data } = await supabase  
  .from('profiles')
  .update({ expo_push_token: user.expo_push_token })
  .eq('id', user.id)

  if (error)
    throw error
  else
    return true
}

export const updateProfile = async (user: RegisterForm) => {
  const { error, data } = await supabase
  .auth
  .updateUser({ data: {
        first_name: user.name,
        last_name: user.surname,
        height: user.height,
        position: user.position,
        birth_date: user.birthDate
  } })

  if (error)
    throw error
  else
    return true
}