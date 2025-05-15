import { User } from "@supabase/supabase-js"
import { supabase } from "./supabase"
import { Profiles } from "@/model/models"
import { RegisterForm } from "@/model/RegisterForm"
import * as ImagePicker from 'expo-image-picker';

export const uploadProfilePic = async (params: {
  user: User;
  file: ImagePicker.ImagePickerAsset
}) => {
  const extension = (() => {
    switch (params.file.mimeType) {
      case 'image/png':
        return 'png';
      case 'image/jpeg':
        return 'jpeg';
      case 'image/jpg':
        return 'jpg';
      default:
        throw new Error('Unsupported file extension');
    }
  })();

  const fileName = `${params.user.id}_profilePic.${extension}`
  
  const formData = new FormData();
  formData.append('file', {
    uri: params.file.uri,
    name: fileName,
    type: params.file.mimeType,
  });

  const { error, data } = await supabase
    .storage
    .from('profileimgbucket')
    .upload(fileName, formData, {
      upsert: true
    })

  if (error)
    throw error

  const { data: publicUrlData } = await supabase.storage
    .from('profileimgbucket')
    .getPublicUrl(fileName)

  if (publicUrlData.publicUrl) {
    const { error: updateAuthError, data: updateAuthData } = await supabase
      .auth
      .updateUser({
        data: {
          profile_img: publicUrlData.publicUrl
        }
      })

    if (updateAuthError)
      throw updateAuthError

    return updateAuthData
  }

  return null
}

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
    .updateUser({
      data: {
        first_name: user.name,
        last_name: user.surname,
        height: user.height,
        position: user.position,
        birth_date: user.birthDate
      }
    })

  if (error)
    throw error
  else
    return true
}