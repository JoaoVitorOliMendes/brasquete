import { View, Text } from 'react-native'
import React from 'react'
import { ClassColor } from '@/model/ClassTypeColor'

interface CustomTitleProps {
  title: string,
  color: keyof ClassColor
}

const CustomTitle = ({ title, color }: CustomTitleProps) => {
  const titleColor: ClassColor = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white'
  }

  return (
    <Text className={`text-5xl leading-relaxed ${titleColor[color]}`}>{title}</Text>
  )
}

export default CustomTitle