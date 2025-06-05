import React, { useState } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Pressable, Image } from 'react-native';
import CustomButton from '@/components/buttons/customButton';
import { Player, Team, TeamModel } from '@/model/models';
import { images } from '@/constants'
import CustomTitle from '../customTitle';
import CustomImage from '../customImage';

interface TeamPlayerModalProps {
    teamA: TeamModel;
    teamB: TeamModel;
    visible: boolean;
    onClose: () => void;
    onConfirm: (player: Player) => void;
}

const TeamPlayerModal = ({ teamA, teamB, visible, onClose, onConfirm }: TeamPlayerModalProps) => {
    console.log("Player", teamA.player && teamA.player.length>0 ? teamA.player[0].group_member : 0)
    return (
        <Modal visible={visible} transparent>
            <View className='relative h-full w-full flex justify-center items-center'>
                <Pressable
                    onPressOut={onClose}
                    className='absolute h-full w-full bg-black opacity-25'
                    style={{
                        elevation: 3
                    }}
                />
                <View className='rounded-lg w-5/6 bg-secondary p-10'>
                    <View className='flex-column justify-center'>
                        <CustomTitle title={teamA.name} className='text-white' sizeClass='text-3xl' />
                        <View className='flex flex-row flex-wrap justify-center items-center'>
                            {
                                teamA.player?.map((player, index) => {
                                    return (
                                        <Pressable key={index} className='basis-4/12 p-2' onPress={() => onConfirm(player)}>
                                            <CustomImage
                                                className='rounded-lg'
                                                imageUrl={player.group_member?.profiles?.profile_img}
                                                altImage={images.person}
                                            />
                                            <Text className='color-white'>
                                                {player.group_member?.profiles?.first_name + ' ' + player.group_member?.profiles?.last_name}
                                            </Text>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                        <CustomTitle title={teamB.name} className='text-white' sizeClass='text-3xl' />
                        <View className='flex flex-row flex-wrap justify-center items-center'>
                            {
                                teamB.player?.map((player, index) => {
                                    return (
                                        <Pressable key={index} className='basis-4/12 p-2' onPress={() => onConfirm(player)}>
                                            <CustomImage
                                                className='rounded-lg'
                                                imageUrl={player.group_member?.profiles?.profile_img}
                                                altImage={images.person}
                                            />
                                            <Text className='color-white'>
                                                {player.group_member?.profiles?.first_name + ' ' + player.group_member?.profiles?.last_name}
                                            </Text>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TeamPlayerModal;