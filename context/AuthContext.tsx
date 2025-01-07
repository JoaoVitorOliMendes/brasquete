import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Account } from '@/model/Account';
import { Login } from '@/model/Login';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    token: string | null,
    authenticated: boolean | null
}

interface AuthContextProps {
    authState?: AuthState,
    onRegister?: (data: Account) => Promise<any>,
    onLogin?: (data: Login) => Promise<any>,
    onLogout?: () => Promise<any>,
    isLoading?: boolean
}

export const AuthContext = createContext<AuthContextProps>({
    isLoading: false,
});

const TOKEN_KEY = 'JWT'

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [authState, setAuthState] = useState<AuthState>({
        authenticated: null,
        token: null
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const loadToken = async () => {
            var token
            if (Platform.OS === 'web') {
                token = await AsyncStorage.getItem(TOKEN_KEY)
            }
            else {
                token = await SecureStore.getItemAsync(TOKEN_KEY)
            }
            if (token) {
                setAuthState({
                    authenticated: true,
                    token: token
                })
            }
        }
        loadToken().finally(() => setIsLoading(false))
    }, [])

    const onRegister = async (data: Account) => {
        setIsLoading(true)
        try {
            // return await axios.post(`${API_URL}`, { data })
            return Promise.resolve(undefined)
        } catch (e) {
            return {
                error: true,
                msg: (e as any).response.data.msg
            }
        } finally {
            setIsLoading(false)
        }
    }
    const onLogin = async (data: Account) => {
        setIsLoading(true)
        try {
            // return await axios.post(`${API_URL}`, { data })
            setAuthState({
                authenticated: true,
                token: 'JWT'
            })

            if (Platform.OS === 'web') {
                 await AsyncStorage.setItem(TOKEN_KEY, 'JWT')
            }
            else {
                await SecureStore.setItemAsync(TOKEN_KEY, 'JWT')
            }
            return Promise.resolve(undefined)
        } catch (e) {
            return {
                error: true,
                msg: (e as any).response.data.msg
            }
        } finally {
            setIsLoading(false)
        }
    }
    const onLogout = async () => {
        setIsLoading(true)
        try {
            // return await axios.post(`${API_URL}`, { data })
            setAuthState({
                authenticated: false,
                token: null
            })

            if (Platform.OS === 'web') {
                 await AsyncStorage.removeItem(TOKEN_KEY)
            }
            else {
                await SecureStore.deleteItemAsync(TOKEN_KEY)
            }
            return Promise.resolve(undefined)
        } catch (e) {
            return {
                error: true,
                msg: (e as any).response.data.msg
            }
        } finally {
            setIsLoading(false)
        }
    }

    const value: AuthContextProps = {
        onRegister,
        onLogin,
        onLogout,
        authState,
        isLoading
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}