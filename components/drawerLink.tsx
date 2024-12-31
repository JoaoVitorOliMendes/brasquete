import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React, { ReactNode } from 'react'

interface DrawerLinkProps {
    label?: string,
    focused: boolean,
    icon?: ((props: {
        color: string;
        size: number;
        focused: boolean;
    }) => React.ReactNode) | undefined,
    onPress: (event: GestureResponderEvent) => void
}

const DrawerLink = ({ label, focused = false, icon, onPress }: DrawerLinkProps) => {
    const iconNode = icon ? icon({ size: 24, focused, color: '#000000' }) : null
    return (
        <Pressable
        className={`
            border-b-2
            flex
            flex-row
            p-5
            ${focused ? 'border-black' : 'border-white'}
        `}
        onPress={onPress}
        >
            <Text>
            {iconNode}
            </Text>
            <Text className={`
                text-2xl
                ml-4
                ${focused ? 'text-black' : 'text-white'}
            `}>
                {label as ReactNode}
            </Text>
        </Pressable>
    )
}

export default DrawerLink