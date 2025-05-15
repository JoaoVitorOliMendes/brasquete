import { View, Text, Image, ImageStyle, StyleProp } from 'react-native'
import React, { useState } from 'react'
import IconConcat from './iconConcat'
import { images } from '@/constants'

interface CustomImageProps {
    imageUrl: string,
    className: string,
    altImage: any,
    style?: StyleProp<ImageStyle>
}

const CustomImage = ({ imageUrl, className, altImage, style = { width: '100%', height: 'auto', aspectRatio: 1 / 1 } }: CustomImageProps) => {
    const [error, setError] = useState(false)

    return (
        <Image
            className={className}
            style={style}
            source={(imageUrl && !error) ? { uri: imageUrl } : altImage}
            onError={() => {
                setError(true)
            }}
        />
    )
}

export default CustomImage