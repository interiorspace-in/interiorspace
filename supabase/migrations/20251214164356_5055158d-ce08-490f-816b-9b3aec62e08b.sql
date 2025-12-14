-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  featured_image TEXT,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Interior Space',
  publish_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (only published blogs)
CREATE POLICY "Anyone can view published blogs" 
ON public.blogs 
FOR SELECT 
USING (status = 'published');

-- Create policy for full access (for admin operations via service role)
CREATE POLICY "Service role has full access" 
ON public.blogs 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create index for slug lookups
CREATE INDEX idx_blogs_slug ON public.blogs(slug);

-- Create index for status filtering
CREATE INDEX idx_blogs_status ON public.blogs(status);

-- Create index for publish date ordering
CREATE INDEX idx_blogs_publish_date ON public.blogs(publish_date DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_blogs_updated_at();