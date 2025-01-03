import { View } from 'react-native'
import React from 'react'
import CustomTitle from '@/components/customTitle'
import CustomDrawerHeader from '@/components/customDrawerHeader'

const Home = () => {
  return (
    <View>
      <CustomDrawerHeader />
      <CustomTitle title='Próximos Eventos' sizeClass='text-4xl' className='m-4' />
    </View>
  )
}

export default Home