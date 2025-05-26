
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

    console.log('Iniciando criação de usuários...')

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
        const { error: roleError } = await supabaseAdmin
          .from('user_roles')
          .upsert([
            { user_id: adminData.user.id, role: 'superadmin' }
          ])
        
        if (roleError) {
          console.error('Erro ao atribuir role de superadmin:', roleError)
        } else {
          console.log('Role de superadmin atribuída com sucesso')
        }
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

    // Criar alguns dados de exemplo para o admin
    if (adminData.user && !adminError) {
      console.log('Criando dados de exemplo para o admin...')
      
      // Criar agentes de exemplo
      const agentsData = [
        {
          user_id: adminData.user.id,
          name: 'Product Owner IA',
          type: 'Product Owner',
          status: 'online',
          description: 'Especialista em definição de produtos e requisitos',
          tasks_count: 5
        },
        {
          user_id: adminData.user.id,
          name: 'Desenvolvedor Full Stack',
          type: 'Developer',
          status: 'busy',
          description: 'Desenvolvedor especializado em React e Node.js',
          tasks_count: 3
        },
        {
          user_id: adminData.user.id,
          name: 'QA Automation',
          type: 'QA',
          status: 'offline',
          description: 'Especialista em testes automatizados',
          tasks_count: 2
        }
      ]

      const { error: agentsError } = await supabaseAdmin
        .from('agents')
        .insert(agentsData)

      if (agentsError) {
        console.error('Erro ao criar agentes:', agentsError)
      } else {
        console.log('Agentes de exemplo criados com sucesso')
      }

      // Criar projetos de exemplo
      const projectsData = [
        {
          user_id: adminData.user.id,
          name: 'Sistema de E-commerce',
          description: 'Desenvolvimento de plataforma de vendas online',
          status: 'em_andamento',
          progress: 65,
          agents_count: 3
        },
        {
          user_id: adminData.user.id,
          name: 'App Mobile Financeiro',
          description: 'Aplicativo para gestão financeira pessoal',
          status: 'em_revisao',
          progress: 80,
          agents_count: 2
        }
      ]

      const { error: projectsError } = await supabaseAdmin
        .from('projects')
        .insert(projectsData)

      if (projectsError) {
        console.error('Erro ao criar projetos:', projectsError)
      } else {
        console.log('Projetos de exemplo criados com sucesso')
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Usuários e dados de exemplo criados com sucesso',
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
