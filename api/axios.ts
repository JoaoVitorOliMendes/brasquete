import { envVars } from '@/constants'
import axios from 'axios'

export const mapsApi = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/",
    params: {
        key: envVars.MAPS_API_KEY
    },
})

export const backend = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        
    },
})