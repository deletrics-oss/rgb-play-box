import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const adminEmail = 'suporte@gmail.com';
    const adminPassword = 'suporte@1';

    console.log('Iniciando reset do usuário admin...');

    // Deletar usuário existente se houver
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === adminEmail);
    
    if (existingUser) {
      console.log(`Deletando usuário existente: ${existingUser.id}`);
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
      if (deleteError) {
        console.error('Erro ao deletar usuário:', deleteError);
        throw deleteError;
      }
      console.log('Usuário deletado com sucesso');
    }

    // Criar novo usuário
    console.log('Criando novo usuário admin...');
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    });

    if (createError) {
      console.error('Erro ao criar usuário:', createError);
      throw createError;
    }

    console.log('Usuário criado com sucesso:', newUser.user.id);
    console.log('O trigger automático vai adicionar a role de admin');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Usuário admin resetado com sucesso',
        email: adminEmail,
        userId: newUser.user.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Erro no reset do admin:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
