import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, useRouter } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/api/supabase';
import LoadingIndicator from '@/components/loadingIndicator';

const Index = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setSession(session)
                router.replace("/(drawer)/event/");
            }
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setSession(session)
                router.replace("/(drawer)/event/");
            } else {
                router.replace("/splash");
            }
        })
    }, [])
}

export default Index