import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { colors, images } from '@/constants'
import CustomTitle from './customTitle'
import CustomPressIcon from './buttons/customPressIcon'
import ReportMemberModal from './modals/reportMemberModal'
import CustomButton from './buttons/customButton'
import { GroupMember } from '@/model/models'

interface GroupMemberListProps {
    members?: GroupMember[],
    separator?: boolean
}

const separatorLabels: { [K in Exclude<GroupMember['confirmed'], null | undefined>]: string } = {
    0: 'Confirmado',
    1: 'Em decisão',
    2: 'Não Vai'
}

const separatorColors: { [K in Exclude<GroupMember['confirmed'], null | undefined>]: string } = {
    0: 'bg-emerald-700',
    1: 'bg-amber-700',
    2: 'bg-red-700'
}

const GroupMemberList = ({ members, separator = false }: GroupMemberListProps) => {
    if (!members) {
        return (
            <View className='flex-1 flex justify-center items-center'>
                <CustomButton label='Adicionar membros' color='secondary' className='w-1/2' />
            </View>
        )
    }

    const [modalVisible, setModalVisible] = useState(false)

    // Fkin mess
    // But i liked it
    const groupedArray = members.reduce<{ [key: number]: GroupMember[] }>((obj, item) => {
        (obj[item.confirmed] = obj[item.confirmed] || []).push(item)
        return obj
    }, {})

    const mapGroups = (separator?: any | undefined) => {
        const arr = !!separator ? groupedArray[separator] : ([] as GroupMember[]).concat.apply([], Object.values(groupedArray))
        return arr.map((item) => {
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
                        <CustomTitle title={item.profiles ? item.profiles.first_name + item.profiles.last_name : ''} sizeClass='text-xl' />
                        <CustomTitle title={item.profiles?.position || ''} sizeClass='text-xl' />
                    </View>
                    <View className='basis-3/12 flex flex-column justify-center items-center p-4'>
                        {
                            separator &&
                            <View className={`rounded-full mb-4 ${separatorColors[item.confirmed]}`} style={{ width: '33%', height: 'auto', aspectRatio: 1 / 1 }} />
                        }
                        <View className='flex flex-row flex-wrap'>
                            <CustomPressIcon iconProps={{icon: 'flag-outline'}} onPress={() => setModalVisible(true)} />
                            <CustomPressIcon iconProps={{icon: 'close'}} onPress={() => console.log} />
                        </View>
                    </View>
                </View>
            )
        })
    }

    const reportMemberModalMemo = useMemo(() => {
        return <ReportMemberModal visible={modalVisible} dismiss={() => setModalVisible(false)} />
    }, [modalVisible])

    return (
        <View className='flex flex-row flex-wrap bg-white p-4'>
            {
                separator ?
                    Object.keys(groupedArray).map((item, idx) => {
                        return (
                            <View key={idx}>
                                <CustomTitle title={separatorLabels[Number(item)]} sizeClass='text-3xl' className='basis-full' />
                                {
                                    mapGroups(item)
                                }
                            </View>
                        )
                    })
                    :
                    mapGroups()
            }
            {reportMemberModalMemo}
        </View>
    )
}

export default GroupMemberList