import { colors } from "@/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList";
import React, { useState } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { TouchableOpacity, View, Text } from "react-native";
import Stars, { StarProps } from "../stars";

interface CustomStarRatingProps<FormType extends FieldValues> {
    formProps: UseControllerProps<FormType>,
    starProps: StarProps
}

const CustomStarRating = <FormType extends FieldValues,>({ formProps, starProps }: CustomStarRatingProps<FormType>) => {

    return (
        <Controller
            {...formProps}
            render={({ field, fieldState }) => {
                return (
                    <Stars {...starProps} setRating={field.onChange} onRatingChange={field.onChange} />
                )
            }}
        />
    )
}

export default CustomStarRating