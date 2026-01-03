-- Create table for service page gallery images
CREATE TABLE public.service_gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_slug TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries by service
CREATE INDEX idx_service_gallery_service_slug ON public.service_gallery_images(service_slug);

-- Enable Row Level Security
ALTER TABLE public.service_gallery_images ENABLE ROW LEVEL SECURITY;

-- Anyone can view enabled images
CREATE POLICY "Anyone can view enabled service images"
ON public.service_gallery_images
FOR SELECT
USING (is_enabled = true);

-- Admins have full access
CREATE POLICY "Admins have full access to service images"
ON public.service_gallery_images
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_service_gallery_images_updated_at
BEFORE UPDATE ON public.service_gallery_images
FOR EACH ROW
EXECUTE FUNCTION public.update_blogs_updated_at();