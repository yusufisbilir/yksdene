// THIS IS A WEBHOOK ROUTE FOR CLERK, IT IS PUBLIC AND DOES NOT REQUIRE AUTHENTICATION

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

// Create a direct Supabase client for webhook handling
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Sync user to supabase
  const user = evt.data as UserJSON

  try {
    if (evt.type === 'user.created') {
      console.log('Creating profile for user:', user.id)
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          graduated: false,
          obp: 80,
        })
        .select()
        .single()

      if (error) throw error
    }
    if (evt.type === 'user.deleted') {
      console.log('Deleting profile for user:', user.id)
      const { error } = await supabase.from('profiles').delete().eq('id', user.id)

      if (error) throw error
    }
  } catch (error) {
    console.error('Error syncing user with Supabase:', error)
    return new Response('Error syncing user with Supabase', { status: 500 })
  }

  return new Response('Webhook received', { status: 200 })
}
