-- Create exclusive_editions table
CREATE TABLE public.exclusive_editions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  badge TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create settings table
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create product_links table
CREATE TABLE public.product_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_version TEXT NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_version, platform)
);

-- Create storage bucket for exclusive editions
INSERT INTO storage.buckets (id, name, public)
VALUES ('exclusive-editions', 'exclusive-editions', true);

-- Enable RLS
ALTER TABLE public.exclusive_editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for exclusive_editions
CREATE POLICY "Admins can manage exclusive editions"
ON public.exclusive_editions
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active exclusive editions"
ON public.exclusive_editions
FOR SELECT
USING (active = true);

-- RLS Policies for settings
CREATE POLICY "Admins can manage settings"
ON public.settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view settings"
ON public.settings
FOR SELECT
USING (true);

-- RLS Policies for product_links
CREATE POLICY "Admins can manage product links"
ON public.product_links
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active product links"
ON public.product_links
FOR SELECT
USING (active = true);

-- Storage policies for exclusive-editions bucket
CREATE POLICY "Admins can upload exclusive edition images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'exclusive-editions' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update exclusive edition images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'exclusive-editions' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete exclusive edition images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'exclusive-editions' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view exclusive edition images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'exclusive-editions');

-- Trigger for updated_at on exclusive_editions
CREATE TRIGGER update_exclusive_editions_updated_at
BEFORE UPDATE ON public.exclusive_editions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for updated_at on settings
CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial exclusive editions data
INSERT INTO public.exclusive_editions (name, badge, image_url, display_order, active) VALUES
('Mortal Kombat Edition', 'Exclusivo', '/src/assets/products/arcade-box-1.png', 1, true),
('Street Fighter Edition', 'Premium', '/src/assets/products/arcade-box-2.png', 2, true),
('Tekken Edition', 'Limited', '/src/assets/products/arcade-box-3.png', 3, true),
('Dragon Ball Edition', 'Especial', '/src/assets/products/arcade-box-4.png', 4, true),
('Retro Classic Edition', 'Clássico', '/src/assets/products/arcade-box-5.png', 5, true),
('The King of Fighters Edition', 'LENDÁRIO', '/src/assets/products/arcade-box-kof.png', 6, true);

-- Insert initial settings
INSERT INTO public.settings (key, value) VALUES
('whatsapp_number', '5511988121976'),
('whatsapp_message', 'Olá! Gostaria de saber mais sobre os Fight Arcade Sticks.'),
('site_name', 'Fight Arcade'),
('site_description', 'Arcade Sticks Premium para Luta');

-- Insert initial product links
INSERT INTO public.product_links (product_version, platform, url, active) VALUES
('mecanica', 'pagseguro', 'https://pag.ae/7-gCVPVdY', true),
('optica', 'pagseguro', 'https://pag.ae/7-gD1yxaF', true),
('mecanica', 'shopee', '', true),
('optica', 'shopee', '', true),
('mecanica', 'mercadolivre', '', true),
('optica', 'mercadolivre', '', true);