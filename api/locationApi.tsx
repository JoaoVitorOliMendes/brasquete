import { Location, LocationModel } from "@/model/models"
import { supabase } from "./supabase"
import { mapper } from "@/model/mappings/mapper"
import * as ImagePicker from 'expo-image-picker'

export const updateLocation = async (location: Location) => {
  const { error, data } = await supabase
    .from('location')
    .update(location)
    .eq('id', location.id)
    .select()

  if (error)
    throw error

  if (data && data.length)
    return mapper.mapArray(data as Location[], 'Location', 'LocationModel') as LocationModel[]
  return []
}

export const insertLocation = async (location: Location) => {
  const { error, data } = await supabase
    .from('location')
    .insert(location)
    .select()

  if (error)
    throw error

  if (data && data.length)
    return mapper.mapArray(data as Location[], 'Location', 'LocationModel') as LocationModel[]
  return []
}

export const uploadLocationPic = async (params: {
  location: LocationModel;
  file: Uint8Array
}) => {
  const fileName = `${params.location.id}_locationPic.png`
  // const formData = new FormData();
  // formData.append('file', {
  //   uri: params.file.uri,
  //   name: fileName,
  //   type: params.file.mimeType,
  // });

  const { error, data } = await supabase
    .storage
    .from('locationimgbucket')
    .upload(fileName, params.file, {
      upsert: true,
      contentType: 'image/png'
    })

  if (error)
    throw error

  const { data: publicUrlData } = await supabase.storage
    .from('locationimgbucket')
    .getPublicUrl(fileName)

  if (publicUrlData.publicUrl) {
    const { error: updateLocError, data: updateLocData } = await supabase
      .from('location')
      .update({
        location_img: publicUrlData.publicUrl
      })
      .eq('id', params.location.id)
      .select()

    if (updateLocError)
      throw updateLocError

    if (updateLocData && updateLocData.length)
      return mapper.mapArray(updateLocData as Location[], 'Location', 'LocationModel') as LocationModel[]
    return []
  }

  return null
}