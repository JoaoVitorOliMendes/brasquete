import { View, Text, Modal } from 'react-native'
import React, { RefObject, useEffect, useMemo, useState } from 'react'
import * as Location from 'expo-location'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import CustomButton from '../buttons/customButton'
import { reverseGeolocation } from '@/api/services/mapsApiManager'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import type { LatLng, Region } from 'react-native-maps'
import LoadingIndicator from '../loadingIndicator'
import { envVars } from '@/constants'

interface MapPickerModalProps<FormType extends FieldValues> {
    formProps: UseControllerProps<FormType>,
    className?: string,
    bottomSheetRef: RefObject<BottomSheetModal>,
    setValue: any,
    latitude?: number,
    longitude?: number,
    onChange?: any
}

const MapPickerModal = <FormType extends FieldValues,>({ formProps, className = '', bottomSheetRef, setValue, latitude, longitude, onChange }: MapPickerModalProps<FormType>) => {
    const snapPoints = useMemo(() => ['95%'], [])

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            enableContentPanningGesture={false}
            backdropComponent={(props) => {
                return (
                    <BottomSheetBackdrop opacity={0.1} enableTouchThrough={false} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
                )
            }}
        >
            <BottomSheetView>
                <Controller
                    {...formProps}
                    render={({ field, fieldState }) => {
                        const [selectedLocation, setSelectedLocation] = useState<Region | null>(null)
                        const [initialLocation, setInitialLocation] = useState<Region | null>(null)
                        const mapRef = React.useRef<MapView>(null)

                        useEffect(() => {
                            if (!(latitude && longitude)) {
                                (async () => {
                                    let { status } = await Location.requestForegroundPermissionsAsync()
                                    if (status !== 'granted') {
                                        console.log('Permission to access location was denied')
                                        return
                                    }

                                    let location = await Location.getCurrentPositionAsync()
                                    setInitialLocation({
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                        longitudeDelta: 0.005,
                                        latitudeDelta: 0.005
                                    })
                                    setSelectedLocation({
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                        longitudeDelta: 0.005,
                                        latitudeDelta: 0.005
                                    })
                                })()
                            } else {
                                setInitialLocation({
                                    latitude: latitude,
                                    longitude: longitude,
                                    longitudeDelta: 0.005,
                                    latitudeDelta: 0.005
                                })
                                setSelectedLocation({
                                    latitude: latitude,
                                    longitude: longitude,
                                    longitudeDelta: 0.005,
                                    latitudeDelta: 0.005
                                })
                            }
                        }, [])

                        const handleLocationPicked = async () => {
                            if (!selectedLocation)
                                return
                            try {
                                const res = await reverseGeolocation(selectedLocation.latitude, selectedLocation.longitude)

                                const addressComponents = res.data.results[0].address_components

                                const streetNumber = addressComponents.find((component: { types: string | string[] }) =>
                                    component.types.includes("street_number"))?.long_name || ''

                                const street = addressComponents.find((component: { types: string | string[] }) =>
                                    component.types.includes("route"))?.long_name || ''

                                const neighborhood = addressComponents.find((component: { types: string | string[] }) =>
                                    component.types.includes("neighborhood") || component.types.includes("sublocality"))?.long_name || ''

                                const city = addressComponents.find((component: { types: string | string[] }) =>
                                    component.types.includes("administrative_area_level_2"))?.long_name || ''

                                const state = addressComponents.find((component: { types: string | string[] }) =>
                                    component.types.includes("administrative_area_level_1"))?.long_name || ''

                                const country = addressComponents.find((component: { types: string | string[] }) =>
                                    component.types.includes("country"))?.short_name || ''

                                onChange()
                                setValue('location.latitude', selectedLocation.latitude)
                                setValue('location.longitude', selectedLocation.longitude)
                                setValue('location.streetNumber', streetNumber)
                                setValue('location.street', street)
                                setValue('location.neighborhood', neighborhood)
                                setValue('location.city', city)
                                setValue('location.state', state)
                                setValue('location.country', country)
                                setValue('location.coordsMatch', true)
                            } catch (e) {
                                console.log(e)
                            } finally {
                                bottomSheetRef.current?.close()
                            }
                        }

                        return (
                            <View className='w-full h-full'>
                                {/* <LoadingIndicator className={`bg-white absolute z-10 ${mapReady && 'hidden'}`} /> */}
                                {
                                    (!!selectedLocation && !!initialLocation) &&
                                    <>
                                        <MapView
                                            ref={mapRef}
                                            style={{ flex: 1 }}
                                            provider={PROVIDER_GOOGLE}
                                            googleMapsApiKey={envVars.MAPS_API_KEY}
                                            loadingEnabled={true}
                                            onPress={(e) => {
                                                setSelectedLocation({
                                                    latitude: e.nativeEvent.coordinate.latitude,
                                                    longitude: e.nativeEvent.coordinate.longitude,
                                                    longitudeDelta: 0.005,
                                                    latitudeDelta: 0.005
                                                })
                                            }}
                                            region={initialLocation}
                                        >
                                            <Marker
                                                coordinate={selectedLocation}
                                            />
                                        </MapView>
                                        <CustomButton className='absolute bottom-4 right-0 left-0 m-4' label='Escolher Localização' onPress={handleLocationPicked} />
                                    </>
                                }
                            </View>
                        )
                    }}
                />
            </BottomSheetView>
        </BottomSheetModal >
    )
}

export default MapPickerModal