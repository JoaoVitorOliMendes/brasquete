import { supabase } from "./supabase";
import { LoginForm } from "@/model/formModels";
import { RegisterForm } from "@/model/RegisterForm";
import { useMutation, useQuery } from "@tanstack/react-query";

export const register = async (registerForm: RegisterForm) => {
  const { data, error: signUpError } = await supabase.auth.signUp({
    email: registerForm.email,
    password: registerForm.password,
    options: {
      data: {
        first_name: registerForm.name,
        last_name: registerForm.surname,
        height: registerForm.height,
        position: registerForm.position,
        birth_date: registerForm.birthDate
      }
    }
  })

  if (signUpError) {
    throw signUpError
  }

  return data
}

export const login = async (loginForm: LoginForm) => {
  
  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email: loginForm.email,
    password: loginForm.password
  })

  if (signInError) {
    throw signInError
  }

  return data
}

export const fetchUser = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session ? session.user : null
};