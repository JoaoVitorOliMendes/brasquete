import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./supabase";

const _NEVER = /* @__PURE__ */ Symbol();
export type NEVER = typeof _NEVER;

export type SupabaseQueryArgs = {
  path: 'auth' | 'data';
  method: string;
  body?: Record<string, any>;
  params?: Record<string, any>;
};

type SupabaseError = PostgrestError | AuthError;

export const supabaseBaseQuery: BaseQueryFn<SupabaseQueryArgs, unknown, SupabaseError> = async ({
  path,
  method,
  body,
  params,
}) => {
  try {
    let result;

    if (path === 'auth') {
      if (!(method in supabase.auth)) {
        throw new Error(`Unsupported auth method: ${method}`);
      }
      result = await (supabase.auth[method as keyof typeof supabase.auth] as Function)(body);
    } else if (path === 'data') {
      const [table, action] = method.split('.');
      if (!(table in supabase) || !(action in supabase[table as keyof typeof supabase])) {
        throw new Error(`Unsupported data method: ${method}`);
      }
      result = await (
        supabase[table as keyof typeof supabase][action as keyof (typeof supabase)[keyof typeof supabase]] as Function
      )(params);
    } else {
      throw new Error(`Unsupported path: ${path}`);
    }

    if (result.error) {
      return { error: result.error };
    }

    return { data: result.data };
  } catch (error) {
    return { error: error as SupabaseError };
  }
};