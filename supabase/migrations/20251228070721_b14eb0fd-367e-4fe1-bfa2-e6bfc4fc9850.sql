-- Create enum for lead status
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'converted');

-- Create whatsapp_leads table
CREATE TABLE public.whatsapp_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  testimonial_id UUID REFERENCES public.video_testimonials(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  project_type TEXT NOT NULL,
  page_source TEXT NOT NULL,
  device_type TEXT NOT NULL,
  status lead_status NOT NULL DEFAULT 'new',
  notes TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.whatsapp_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to have full access
CREATE POLICY "Admins have full access to whatsapp_leads"
ON public.whatsapp_leads
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create policy for anonymous insert (for lead tracking)
CREATE POLICY "Anyone can create a lead"
ON public.whatsapp_leads
FOR INSERT
WITH CHECK (true);

-- Create trigger for updating updated_at
CREATE TRIGGER update_whatsapp_leads_updated_at
BEFORE UPDATE ON public.whatsapp_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_video_testimonials_updated_at();

-- Create indexes for better query performance
CREATE INDEX idx_whatsapp_leads_testimonial_id ON public.whatsapp_leads(testimonial_id);
CREATE INDEX idx_whatsapp_leads_status ON public.whatsapp_leads(status);
CREATE INDEX idx_whatsapp_leads_clicked_at ON public.whatsapp_leads(clicked_at);
CREATE INDEX idx_whatsapp_leads_project_type ON public.whatsapp_leads(project_type);