import { mapsApi } from '@/api/axios'
import MAPS_ENDPOINTS from "@/api/services/mapsEndPoints"

const reverseGeolocation = async (latitude: number, longitude: number) => {
    return await mapsApi.get(MAPS_ENDPOINTS.REV_GEOCODE, {
        params: {
            latlng: `${latitude},${longitude}`,
            result_type: 'street_address'
        }
    })
}

const generateGroupsMapImage = async (latitude: number, longitude: number) => {
    return await mapsApi.get(MAPS_ENDPOINTS.STATIC_MAPS, {
        params: {
            center: `${latitude},${longitude}`,
            zoom: '16',
            maptype: 'roadmap',
            size: '500x500',
            markers: `color:red|${latitude},${longitude}`,
            format: 'png'
        },
        responseType: 'arraybuffer'
    })
}

export {
    reverseGeolocation,
    generateGroupsMapImage
}