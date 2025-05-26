
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wvplmbsfxsqfxupeucsd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cGxtYnNmeHNxZnh1cGV1Y3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyODU5ODUsImV4cCI6MjA2Mzg2MTk4NX0.Ia6qOdYAvQ4omzvFsLWW3xKN5bYe6IYLvucYhNphSXk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})

export const isSupabaseConfigured = true
