import { colors } from "@/constants";
import { ClassColor } from "@/model/ClassTypeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList";
import React, { useState } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { TouchableOpacity, View, Text } from "react-native";

export interface StarProps {
    className?: string,
    maxStars?: number,
    rating?: number,
    label?: string,
    disabled?: boolean,
    onRatingChange?: (rating: number) => void,
    size?: number,
    textClassName?: string
}


const Stars = ({ className = '', maxStars = 5, rating = 0, label, disabled = false, onRatingChange, size = 24, textClassName = ''}: StarProps) => {
    const [currentRating, setCurrentRating] = useState(rating)

    const handlePress = (newRating: number) => {
        setCurrentRating(newRating)
        if (onRatingChange)
            onRatingChange(newRating)
    }

    // Render the stars
    const renderStars = () => {
        let stars = []
        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => handlePress(i)} disabled={disabled}>
                    <MaterialIcons
                        name={i <= currentRating ? 'star' : 'star-border'}
                        size={size}
                        color={
                            i <= currentRating ? (disabled ? colors.darkGray + '50' : colors.yellow) : colors.gray
                        }
                    />
                </TouchableOpacity>
            )
        }
        return stars
    }
    return (
        <View className={`flex flex-row items-center justify-between ${className}`}>
            <Text className={textClassName}>
                {label}
            </Text>
            <View className='flex flex-row'>
                {renderStars()}
            </View>
        </View>
    )
}

export default Stars