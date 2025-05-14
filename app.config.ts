import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "Brasquete",
    slug: "Brasquete",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "com.brasquete",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    ios: {
        supportsTablet: true,
        config: {
            usesNonExemptEncryption: false
        }
    },
    android: {
        permissions: [
            "android.permission.ACCESS_COARSE_LOCATION",
            "android.permission.ACCESS_FINE_LOCATION"
        ],
        softwareKeyboardLayoutMode: "pan",
        adaptiveIcon: {
            foregroundImage: "./assets/images/logo.png",
            backgroundColor: "#000000"
        },
        config: {
            googleMaps: {
                apiKey: process.env.EXPO_PUBLIC_MAPS_API_KEY_DEV
            }
        },
        package: "com.brasquete",
        googleServicesFile: "./google-services.json"
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/logo.png"
    },
    plugins: [
        "expo-router",
        "expo-secure-store",
        "expo-location",
        [
            "react-native-permissions",
            {
                iosPermissions: []
            }
        ],
        [
            "expo-splash-screen",
            {
                image: "./assets/images/logo.png",
                imageWidth: 200,
                resizeMode: "contain",
                backgroundColor: "#000000"
            }
        ],
        "expo-image-picker",
        "expo-secure-store"
    ],
    experiments: {
        typedRoutes: true
    },
    extra: {
        router: {
            origin: false
        },
        eas: {
            projectId: "84688503-ed87-4c70-831b-575d9e0caa68"
        }
    },
    owner: "joaovitorolimendes"
});