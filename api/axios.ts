import { useAuth } from '@/context/AuthContext'
import axios from 'axios'

export const mapsApi = axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/",
    params: {
        key: process.env.EXPO_PUBLIC_MAPS_API_KEY_DEV
    },
})

export const backend = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        
    },
})