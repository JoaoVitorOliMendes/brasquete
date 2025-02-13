const envType = process.env.EXPO_PUBLIC_ENV_TYPE || 'DEV'

var MAPS_API_KEY
var SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || ''
var SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || ''

if (envType == 'DEV') {
    MAPS_API_KEY = process.env.EXPO_PUBLIC_MAPS_API_KEY_DEV || ''
} else if (envType == 'PRD') {
    MAPS_API_KEY = process.env.EXPO_PUBLIC_MAPS_API_KEY_PRD || ''
}

export default {
    MAPS_API_KEY,
    SUPABASE_URL,
    SUPABASE_ANON_KEY
}