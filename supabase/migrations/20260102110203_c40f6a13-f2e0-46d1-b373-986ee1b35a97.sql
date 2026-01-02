-- Create services table for backend-driven service images
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Anyone can view enabled services
CREATE POLICY "Anyone can view enabled services"
  ON public.services
  FOR SELECT
  USING (is_enabled = true);

-- Admins have full access
CREATE POLICY "Admins have full access to services"
  ON public.services
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blogs_updated_at();

-- Insert default services data
INSERT INTO public.services (title, description, image_url, link, display_order) VALUES
  ('Full Home Interiors', 'Complete interior solutions for your entire home', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800', '/services/full-home-interiors', 1),
  ('Modular Kitchens', 'Modern and functional kitchen designs', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', '/services/modular-kitchens', 2),
  ('Living Rooms', 'Elegant and comfortable living spaces', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', '/services/living-rooms', 3),
  ('Bedrooms', 'Peaceful and personalized bedroom designs', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800', '/services/bedrooms', 4),
  ('Wardrobes', 'Custom storage solutions for your needs', 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800', '/services/wardrobes', 5),
  ('Sofa and Dining', 'Stylish furniture for dining and relaxation', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', '/services/sofa-dining', 6),
  ('Entrance and Foyer', 'Make a lasting first impression', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', '/services/entrance-foyer', 7),
  ('Office Spaces', 'Productive and inspiring work environments', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', '/services/office-spaces', 8);

-- Create index for ordering
CREATE INDEX idx_services_display_order ON public.services(display_order);