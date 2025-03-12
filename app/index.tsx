import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, useRouter } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/api/supabase';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/api/authApi';

const Index = () => {
    const { data: user, isLoading } = useQuery(['user'], fetchUser)
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && user)
            router.replace("/(drawer)/event/");

        supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                router.replace("/(drawer)/event/");
            } else {
                router.replace("/splash");
            }
        })
    }, [])
}

export default Index