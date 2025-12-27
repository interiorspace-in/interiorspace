-- Add new columns to video_testimonials table
ALTER TABLE public.video_testimonials 
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS star_rating integer DEFAULT 5 CHECK (star_rating >= 1 AND star_rating <= 5);

-- Create index on location for faster queries
CREATE INDEX IF NOT EXISTS idx_video_testimonials_location ON public.video_testimonials(location);

-- Update the updated_at trigger if not exists
CREATE OR REPLACE FUNCTION public.update_video_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Drop existing trigger if exists and recreate
DROP TRIGGER IF EXISTS update_video_testimonials_updated_at ON public.video_testimonials;
CREATE TRIGGER update_video_testimonials_updated_at
BEFORE UPDATE ON public.video_testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_video_testimonials_updated_at();