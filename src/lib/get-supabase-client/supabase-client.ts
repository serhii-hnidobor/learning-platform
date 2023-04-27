import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

let supabaseClient: ReturnType<typeof createClient<Database>> | undefined;

export default function (supabaseAccessToken: string) {
  if (!supabaseClient) {
    supabaseClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      },
    );
  }

  return supabaseClient;
}
