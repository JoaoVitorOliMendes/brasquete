import { View, Text, Modal } from 'react-native'
import React, { RefObject, useEffect, useMemo, useState } from 'react'
import { MapView, Marker, PROVIDER_GOOGLE } from '@/components/map/mymap'
import * as Location from 'expo-location'
import type { LatLng } from 'react-native-maps'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import CustomButton from './customButton'

interface MapPickerModalProps<FormType extends FieldValues> {
    formProps: UseControllerProps<FormType>,
    className?: string,
    bottomSheetRef: RefObject<BottomSheetModal>
}

const MapPickerModal = <FormType extends FieldValues,>({ formProps, className = '', bottomSheetRef }: MapPickerModalProps<FormType>) => {
    const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

    const snapPoints = useMemo(() => ['95%'], [])

    useEffect(() => {
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                console.log('Permission to access location was denied')
                return
            }

            let location = await Location.getCurrentPositionAsync()
            setUserLocation(location)
            setSelectedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        }
        getCurrentLocation()
    }, []);

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            enableContentPanningGesture={false}
            backdropComponent={(props) => {
                return (
                    <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
                )
            }}
        >
            <BottomSheetView>
                {
                    (userLocation && selectedLocation) ?
                        <Controller
                            {...formProps}
                            render={({ field, fieldState }) => {
                                return (
                                    <View className='w-full h-full'>
                                        <MapView
                                            style={{ width: '100%', height: '100%' }}
                                            provider={PROVIDER_GOOGLE}
                                            showsIndoors={false}
                                            showsTraffic={false}
                                            showsBuildings={false}
                                            showsScale={true}
                                            onPress={(e) => {
                                                console.log(e.nativeEvent.coordinate)
                                                setSelectedLocation({
                                                    latitude: e.nativeEvent.coordinate.latitude,
                                                    longitude: e.nativeEvent.coordinate.longitude
                                                })
                                            }}
                                            initialRegion={{
                                                latitude: userLocation.coords.latitude,
                                                longitude: userLocation.coords.longitude,
                                                longitudeDelta: 0.005,
                                                latitudeDelta: 0.005
                                            }}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude: selectedLocation.latitude,
                                                    longitude: selectedLocation.longitude
                                                }}
                                            />
                                        </MapView>
                                        <CustomButton className='absolute bottom-4 right-0 left-0 m-4' label='Escolher Localização' onPress={() => {
                                            field.onChange({
                                                latitude: selectedLocation.latitude,
                                                longitude: selectedLocation.longitude
                                            })
                                            bottomSheetRef.current?.close()
                                        }} />
                                    </View>
                                )
                            }}
                        />
                        :
                        <Text>
                            Please enable Location
                        </Text>
                }
            </BottomSheetView>
        </BottomSheetModal>
    )
}

export default MapPickerModal