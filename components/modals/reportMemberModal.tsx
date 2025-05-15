import { View, Text, Modal, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomTitle from '../customTitle';
import { useForm } from 'react-hook-form';
import CustomButton from '../buttons/customButton';
import CustomCheckbox from '../forms/customCheckbox';
import CustomInput from '../forms/customInput';
import { TextInput } from 'react-native-gesture-handler';
import { Report, ReportMotive } from '@/model/models';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addReport, getMotives } from '@/api/reportApi';
import { fetchUser } from '@/api/authApi';

interface ReportMemberModalProps {
  visible?: boolean;
  dismiss: () => void;
  targetId: string | null;
}

const ReportMemberModal = ({ visible, dismiss = () => {}, targetId }: ReportMemberModalProps) => {
  const { control, handleSubmit, setValue, getValues } = useForm<Report>({
    defaultValues: {
      reportmotive: [],
      other_motive: '',
    },
  });

  const { data: user } = useQuery(['user'], fetchUser);
  const { data: motivesData } = useQuery(['report', 'motive'], getMotives);

  const addReportMutation = useMutation(addReport)

  const [selectedMotives, setSelectedMotives] = useState<string[]>([]);
  const [otherFlag, setOtherFlag] = useState(false);

  const otherMotiveRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!otherFlag) {
      setValue('other_motive', '');
    }
  }, [otherFlag, setValue]);

  useEffect(() => {
    console.log(motivesData)
  }, [motivesData])

  const toggleMotive = (motiveId: string) => {
    setSelectedMotives((prev) =>
      prev.includes(motiveId) ? prev.filter((id) => id !== motiveId) : [...prev, motiveId]
    );
  };

  const handleReport = (data: any) => {
    console.log(user.id, targetId)
    if (user && targetId) {
      const report: Report = {
        reportmotive: selectedMotives.map((motiveId) => ({
          motive_id: motiveId,
        })) as ReportMotive[],
        target: targetId,
        created_by: user?.id,
        other_motive: otherFlag ? data.other_motive : '',
      };
  
      console.log('Report Submitted:', report);
      addReportMutation.mutate(report, {
        onSuccess: () => {
          dismiss();
        }
      })
    }
  };

  return (
    <Modal visible={visible} transparent>
      <View className="relative h-full w-full flex justify-center items-center">
        <Pressable
          onPressOut={dismiss}
          className="absolute h-full w-full bg-black opacity-25"
          style={{
            elevation: 3,
          }}
        />
        <View className="rounded-lg w-5/6 bg-primary p-10">
          <CustomTitle
            title="Denunciar Jogador"
            color="white"
            sizeClass="text-2xl"
            className="mb-10"
          />
          <View>
            <Text className="text-white text-lg mb-4">Motivo:</Text>
            <View className="flex flex-column">
              {motivesData?.map((motive) => (
                <CustomCheckbox
                  key={motive.id}
                  label={motive.motive}
                  value={selectedMotives.includes(motive.id)}
                  setValue={() => toggleMotive(motive.id)}
                  color="white"
                  className="mb-4"
                />
              ))}
              <CustomCheckbox
                label="Outro:"
                value={otherFlag}
                setValue={() => setOtherFlag(!otherFlag)}
                color="white"
                className="mt-5 mb-2"
              />
              <CustomInput
                type="filled"
                color="white"
                formProps={{
                  control,
                  name: 'other_motive',
                }}
                inputProps={{
                  placeholder: 'Descreva o motivo',
                  onSubmitEditing: () => handleSubmit(handleReport),
                }}
                inputRef={otherMotiveRef}
                multiline
                numberOfLines={5}
                disabled={!otherFlag}
              />
            </View>
            <CustomButton
              label="Denunciar"
              color="white"
              className="mt-5"
              onPress={handleSubmit(handleReport)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportMemberModal;