-- Create app_role enum if not exists
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table for secure role management
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Create video_testimonials table
CREATE TABLE public.video_testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    project_type TEXT NOT NULL,
    testimonial_text TEXT NOT NULL,
    youtube_url TEXT NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view enabled testimonials
CREATE POLICY "Anyone can view enabled testimonials"
ON public.video_testimonials
FOR SELECT
USING (is_enabled = true);

-- Admins can do everything
CREATE POLICY "Admins have full access to testimonials"
ON public.video_testimonials
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create index for ordering
CREATE INDEX idx_video_testimonials_order ON public.video_testimonials(display_order, created_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_video_testimonials_updated_at
BEFORE UPDATE ON public.video_testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_blogs_updated_at();

-- Insert sample data
INSERT INTO public.video_testimonials (client_name, project_type, testimonial_text, youtube_url, display_order) VALUES
('Priya Sharma', '3BHK Apartment', 'Interior Space transformed our home beyond imagination. Every corner reflects our personality!', 'https://www.youtube.com/shorts/dQw4w9WgXcQ', 1),
('Rajesh Kumar', '2BHK Flat', 'Professional team, on-time delivery, and stunning results. Highly recommended!', 'https://www.youtube.com/shorts/dQw4w9WgXcQ', 2),
('Anita Desai', 'Office Space', 'Our office looks modern and inspires productivity. Great work by the team!', 'https://www.youtube.com/shorts/dQw4w9WgXcQ', 3);