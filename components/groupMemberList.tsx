import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GroupMember } from '@/model/api'
import { images } from '@/constants'
import CustomTitle from './customTitle'
import CustomPressIcon from './customPressIcon'
import ReportMemberModal from './reportMemberModal'

interface GroupMemberListProps {
    members?: GroupMember[],
    separator?: boolean
}

const GroupMemberList = ({ members, separator }: GroupMemberListProps) => {
    const [modalVisible, setModalVisible] = useState(false)
    const separatorLabels: { [K in Exclude<GroupMember['confirmed'], null | undefined>]: string } = {
        confirmed: 'Confirmado',
        deciding: 'Em decisão',
        absent: 'Não Vai'
    }

    const separatorColors: { [K in Exclude<GroupMember['confirmed'], null | undefined>]: string } = {
        confirmed: 'bg-emerald-700',
        deciding: 'bg-amber-700',
        absent: 'bg-red-700'
    }

    if (!members) {
        return (
            <View>
                Add Amigos
            </View>
        )
    }

    return (
        <View className='flex flex-row flex-wrap bg-white p-4'>
            {
                Object.keys(separatorLabels).map((item, idx) => {
                    return (
                        <View key={idx}>
                            <CustomTitle title={separatorLabels[item as keyof typeof separatorLabels]} sizeClass='text-3xl' className='basis-full' />
                            {
                                members.filter((val) => val.confirmed === item).map((item) => {
                                    return (
                                        <View className='flex flex-row' key={item.id}>
                                            {/* I'm the fking best dude */}
                                            < View className='basis-3/12 flex items-center justify-center p-5' >
                                                <Image
                                                    className='rounded-full'
                                                    style={{ width: '100%', height: 'auto', aspectRatio: 1 / 1 }}
                                                    source={images.person}
                                                />
                                            </View >
                                            <View className='basis-6/12 flex flex-column justify-center px-4'>
                                                <CustomTitle title={item.user?.name || ''} sizeClass='text-xl' />
                                                <CustomTitle title={item.position || ''} sizeClass='text-xl' />
                                            </View>
                                            <View className='basis-3/12 flex flex-column justify-center items-center p-4'>
                                                <View className={`rounded-full mb-4 ${separatorColors[item.confirmed]}`} style={{ width: '33%', height: 'auto', aspectRatio: 1 / 1 }} />
                                                <CustomPressIcon icon='flag-outline' onPress={() => setModalVisible(true)} />
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
            <ReportMemberModal visible={modalVisible} dismiss={() => setModalVisible(false)} />
        </View>
    )
}

export default GroupMemberList