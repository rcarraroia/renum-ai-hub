
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Criar o superadmin
    const { data: adminData, error: adminError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@renatocarraro.com.br',
      password: 'M&151173c@',
      user_metadata: {
        full_name: 'Renato Carraro'
      },
      email_confirm: true
    })

    if (adminError) {
      console.error('Erro ao criar admin:', adminError)
    } else {
      console.log('Admin criado:', adminData.user?.email)
      
      // Atribuir role de superadmin
      if (adminData.user) {
        await supabaseAdmin
          .from('user_roles')
          .upsert([
            { user_id: adminData.user.id, role: 'superadmin' }
          ])
      }
    }

    // Criar o usuário colaborador
    const { data: userUser, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: 'colaborador@renatocarraro.com.br',
      password: 'M&151173c@',
      user_metadata: {
        full_name: 'Colaborador'
      },
      email_confirm: true
    })

    if (userError) {
      console.error('Erro ao criar colaborador:', userError)
    } else {
      console.log('Colaborador criado:', userUser.user?.email)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        admin: adminData?.user?.email,
        user: userUser?.user?.email
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Erro geral:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
