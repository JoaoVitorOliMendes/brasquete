// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { createClient } from 'jsr:@supabase/supabase-js@2'



interface Event {
  id: string,
  date: string,
  group_id: string,
  created_at: string,
  updated_at: string
}

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: Event
  schema: 'public'
  old_record: null | Event
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  
  const payload: WebhookPayload = await req.json()
  
  const { data: groupMemberData } = await supabase
    .from('group_member')
    .select('user_id')
    .eq('group_id', payload.record.group_id)

  

  const userArray = groupMemberData.map((item: { user_id: string }) => {
    return item.user_id
  })

  

  const { data } = await supabase
    .from('profiles')
    .select('expo_push_token')
    .in('id', userArray)

  

  if (data && data.length > 0) {
    data.forEach(async (element: { expo_push_token: any }) => {
      const res = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Deno.env.get('EXPO_ACCESS_TOKEN')}`,
        },
        body: JSON.stringify({
          to: element.expo_push_token,
          sound: 'default',
          body: 'Event created successfully',
        }),
      }).then((res) => res.json())
      
    });
  }

  return new Response(JSON.stringify(!!(data && data.length > 0)), {
    headers: { 'Content-Type': 'application/json' },
  })
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'