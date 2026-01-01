-- Create estimate_leads table to store form submissions
CREATE TABLE public.estimate_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  floor_plan TEXT NOT NULL,
  purpose TEXT NOT NULL,
  budget TEXT NOT NULL,
  possession TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.estimate_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit an estimate (anonymous insert)
CREATE POLICY "Anyone can submit estimate" 
ON public.estimate_leads 
FOR INSERT 
WITH CHECK (true);

-- Admins have full access
CREATE POLICY "Admins have full access to estimate_leads" 
ON public.estimate_leads 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_estimate_leads_updated_at
BEFORE UPDATE ON public.estimate_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_video_testimonials_updated_at();

-- Add index for quick lookups
CREATE INDEX idx_estimate_leads_created_at ON public.estimate_leads(created_at DESC);
CREATE INDEX idx_estimate_leads_status ON public.estimate_leads(status);