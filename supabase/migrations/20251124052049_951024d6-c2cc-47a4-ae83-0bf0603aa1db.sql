-- 1. Deletar role de admin do usuário atual
DELETE FROM public.user_roles 
WHERE user_id = '25e398b0-1e87-47da-8d34-2c17c691cd57';

-- 2. Deletar usuário do auth
DELETE FROM auth.users 
WHERE id = '25e398b0-1e87-47da-8d34-2c17c691cd57';

-- 3. Criar função que adiciona admin automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Se o email for suporte@gmail.com, adiciona role de admin automaticamente
  IF NEW.email = 'suporte@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. Criar trigger para novos usuários
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();