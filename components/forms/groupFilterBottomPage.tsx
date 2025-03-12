// import { View, Text, Modal } from 'react-native'
// import React, { RefObject, useEffect, useMemo, useState } from 'react'
// import * as Location from 'expo-location'
// import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
// import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
// import CustomButton from '../buttons/customButton'
// import { reverseGeolocation } from '@/api/services/mapsApiManager'
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
// import type { LatLng, Region } from 'react-native-maps'
// import CustomInput from './customInput'

// interface GroupFilterBottomPageProps<FormType extends FieldValues> {
//     formProps: UseControllerProps<FormType>,
//     className?: string,
//     bottomSheetRef: RefObject<BottomSheetModal>,
//     setValue: any,
//     latitude?: number,
//     longitude?: number,
//     onChange?: any
// }

// const GroupFilterBottomPage = <FormType extends FieldValues,>({ formProps, className = '', bottomSheetRef, setValue, latitude, longitude, onChange }: GroupFilterBottomPageProps<FormType>) => {
//     const snapPoints = useMemo(() => ['95%'], [])

//     return (
//         <BottomSheetModal
//             ref={bottomSheetRef}
//             snapPoints={snapPoints}
//             enablePanDownToClose={true}
//             enableContentPanningGesture={false}
//             backdropComponent={(props) => {
//                 return (
//                     <BottomSheetBackdrop opacity={0.1} enableTouchThrough={false} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
//                 )
//             }}
//         >
//             <BottomSheetView>
//                 <Controller
//                     {...formProps}
//                     render={({ field, fieldState }) => {
//                         return (
//                             <CustomInput
//                                 color='black'
//                                 type='outline'
//                                 inputRef={surnameRef}
//                                 formProps={{
//                                     control,
//                                     name: 'surname',
//                                     rules: {
//                                         required: 'Sobrenome é obrigatório'
//                                     }
//                                 }}
//                                 inputProps={{
//                                     placeholder: 'Sobrenome',
//                                     onSubmitEditing: () => emailRef.current?.focus(),
//                                     returnKeyType: 'next'
//                                 }}
//                                 className='mb-4'
//                             />
//                         )
//                     }}
//                 />
//             </BottomSheetView>
//         </BottomSheetModal >
//     )
// }

// export default GroupFilterBottomPage