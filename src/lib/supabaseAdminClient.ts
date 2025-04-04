import { createClient } from '@supabase/supabase-js'

// Create a Supabase client authenticated with the service role key
// This client bypasses RLS policies.
export const supabaseAdminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      // Prevent the client from trying to use a user's JWT
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

// Use this client for operations requiring admin privileges,
// like fetching all users or performing actions across user data.
