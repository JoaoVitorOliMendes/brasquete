import { envVars } from '@/constants'
import axios from 'axios'

export const mapsApi = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/",
    params: {
        key: envVars.MAPS_API_KEY
    },
})