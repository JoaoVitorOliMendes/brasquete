import { View, Text } from 'react-native'
import React from 'react'
import { EventProvider } from '@/context/EventContext'
import { Slot } from 'expo-router'

const EventDetailsLayout = () => {
  return (
    <EventProvider>
        <Slot />
    </EventProvider>
  )
}

export default EventDetailsLayout