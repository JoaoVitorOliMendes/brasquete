import { useMutation, useQuery, useQueryClient } from "react-query"
import { supabase } from "./supabase";
import { LoginForm } from "@/model/LoginForm";
import { RegisterForm } from "@/model/RegisterForm";

const register = async (registerForm: RegisterForm) => {
    const { data, error: signUpError } = await supabase.auth.signUp({
        email: registerForm.email,
        password: registerForm.password,
        options: {
          data: {
            first_name: registerForm.name,
            last_name: registerForm.surname
          }
        }
      })

    if (signUpError) {
        throw signUpError
    }

    return data
}

const login = async (loginForm: LoginForm) => {
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password
    })

    if (signInError) {
        throw signInError
    }

    return data
}

const fetchUser = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session ? session.user : null
};

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  });
};

export function useRegister(registerForm: RegisterForm) {
    return useMutation(() => register(registerForm))
}
export function useLogin(loginForm: LoginForm) {
    return useMutation(() => login(loginForm))
}