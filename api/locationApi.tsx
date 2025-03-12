import { Location, LocationModel } from "@/model/models"
import { supabase } from "./supabase"
import { mapper } from "@/model/mappings/mapper"

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
}