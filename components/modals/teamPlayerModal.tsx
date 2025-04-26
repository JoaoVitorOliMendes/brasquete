import React, { useState } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Pressable, Image } from 'react-native';
import CustomButton from '@/components/buttons/customButton';
import { Player, Team, TeamModel } from '@/model/models';
import { images } from '@/constants'
import CustomTitle from '../customTitle';

interface TeamPlayerModalProps {
    teamA: TeamModel;
    teamB: TeamModel;
    visible: boolean;
    onClose: () => void;
    onConfirm: (player: Player) => void;
}

const TeamPlayerModal = ({ teamA, teamB, visible, onClose, onConfirm }: TeamPlayerModalProps) => {
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
                    <View className='flex-row'>
                        <CustomTitle title={teamA.name} className='text-white' />
                        <View className='flex-1  justify-center items-center'>
                            {
                                teamA.player?.map((player, index) => (
                                    <Pressable key={index} onPress={() => onConfirm(player)}>
                                        <Image
                                            style={{ width: '100%', height: 'auto', aspectRatio: 1 / 1 }}
                                            source={images.person}
                                        />
                                    </Pressable>
                                ))
                            }
                        </View>
                        <CustomTitle title={teamB.name} className='text-white' />
                        <View className='flex-1  justify-center items-center'>
                            {
                                teamB.player?.map((player, index) => (

                                    <Pressable key={index} onPress={() => onConfirm(player)}>
                                        <Image
                                            style={{ width: '100%', height: 'auto', aspectRatio: 1 / 1 }}
                                            source={images.person}
                                        />
                                    </Pressable>
                                ))
                            }
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TeamPlayerModal;