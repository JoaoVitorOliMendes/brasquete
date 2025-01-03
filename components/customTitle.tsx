import { View, Text } from 'react-native'
import React from 'react'
import { ClassColor } from '@/model/ClassTypeColor'

interface CustomTitleProps {
  title: string,
  color?: keyof ClassColor,
  className?: string,
  sizeClass?: 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl'
}

const CustomTitle = ({ title, color='black', sizeClass='text-5xl', className }: CustomTitleProps) => {
  const titleColor: ClassColor = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white'
  }

  return (
    <Text className={`${sizeClass} leading-relaxed ${titleColor[color]} ${className}`}>{title}</Text>
  )
}

export default CustomTitle