import { envVars } from '@/constants';
import { createApi } from '@reduxjs/toolkit/query/react';
import { supabaseBaseQuery } from './customBaseQuery';
import { Event as EventModel } from '@/model/models';
import { supabase } from './supabase';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: supabaseBaseQuery,
  endpoints: (builder) => ({
    getPublicEvents: builder.query({
      queryFn: async (item) => {
        const { data, error } = await supabase
          .from('event')
          .select();

        if (error) {
          return { error };
        }
        return { data };
      }
    }),
  }),
});

// export type GetEventsResponse = {
//   page?: number;
//   limit?: number;
// }

// export type GetEventsArgs = {
//   events: EventModel[];
//   page?: number;
//   limit?: number;
// }

export const { useGetPublicEventsQuery } = eventsApi;