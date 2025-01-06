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

export {
    reverseGeolocation
}