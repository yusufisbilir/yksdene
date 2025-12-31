import { NextResponse } from 'next/server'
import { supabaseAdminClient } from '@/lib/supabaseAdminClient'

export async function GET() {
    try {
        const { error } = await supabaseAdminClient.from('profiles').select('id').limit(1).single()

        if (error) {
            console.error('Supabase Health Check Error:', error)
            // We can still return 200 to keep the service "alive" but log the db error, 
            // or return 500 if the db is critical. For keep-alive, 200 is usually preferred 
            // so the pinger doesn't stop, but let's signal the db status.
            return NextResponse.json({
                status: 'error',
                message: 'Database connection failed',
                timestamp: new Date().toISOString(),
            }, { status: 500 })
        }

        return NextResponse.json({
            status: 'ok',
            database: 'connected',
            timestamp: new Date().toISOString(),
        })
    } catch (err) {
        return NextResponse.json({
            status: 'error',
            message: 'Internal Server Error',
            timestamp: new Date().toISOString(),
        }, { status: 500 })
    }
}