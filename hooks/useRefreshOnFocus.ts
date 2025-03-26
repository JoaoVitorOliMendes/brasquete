import React from 'react'
import { useFocusEffect } from '@react-navigation/native'

// https://tanstack.com/query/v4/docs/framework/react/react-native#refresh-on-screen-focus
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      console.log('useFocusEffect')
      if (firstTimeRef.current) {
         firstTimeRef.current = false;
         return;
      }

      refetch()
    }, [refetch])
  )
}