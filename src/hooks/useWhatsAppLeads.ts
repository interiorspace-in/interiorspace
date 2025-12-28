import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WhatsAppLead {
  id: string;
  testimonial_id: string | null;
  client_name: string;
  project_type: string;
  page_source: string;
  device_type: string;
  status: "new" | "contacted" | "converted";
  notes: string | null;
  clicked_at: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadParams {
  testimonial_id?: string;
  client_name: string;
  project_type: string;
  page_source: string;
}

export const WHATSAPP_NUMBER = "919999999999"; // Replace with actual number

export const getDeviceType = (): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
    return "Mobile";
  }
  return "Desktop";
};

export const generateWhatsAppMessage = (clientName: string, projectType: string): string => {
  return `Hi Interior Space Team,

I saw the testimonial of ${clientName} for ${projectType} on your website.

I'm interested in a similar interior design project.

Please connect with me.`;
};

export const getWhatsAppUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const trackWhatsAppClick = async (params: CreateLeadParams): Promise<void> => {
  const deviceType = getDeviceType();
  
  try {
    const { error } = await supabase
      .from("whatsapp_leads")
      .insert({
        testimonial_id: params.testimonial_id || null,
        client_name: params.client_name,
        project_type: params.project_type,
        page_source: params.page_source,
        device_type: deviceType,
        status: "new",
      });
    
    if (error) {
      console.error("Failed to track WhatsApp lead:", error);
    }
  } catch (err) {
    console.error("Failed to track WhatsApp lead:", err);
  }
};

export const useWhatsAppLeads = () => {
  return useQuery({
    queryKey: ["whatsapp-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("whatsapp_leads")
        .select("*")
        .order("clicked_at", { ascending: false });

      if (error) throw error;
      return data as WhatsAppLead[];
    },
  });
};

export const useUpdateLeadStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "new" | "contacted" | "converted" }) => {
      const { error } = await supabase
        .from("whatsapp_leads")
        .update({ status })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-leads"] });
    },
  });
};

export const useUpdateLeadNotes = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const { error } = await supabase
        .from("whatsapp_leads")
        .update({ notes })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-leads"] });
    },
  });
};

export const useLeadAnalytics = () => {
  const { data: leads } = useWhatsAppLeads();
  
  if (!leads) {
    return {
      totalLeads: 0,
      newLeads: 0,
      contactedLeads: 0,
      convertedLeads: 0,
      mobileLeads: 0,
      desktopLeads: 0,
      topTestimonials: [],
      topProjectTypes: [],
      weeklyLeads: 0,
      dailyLeads: 0,
    };
  }

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const dailyLeads = leads.filter(l => new Date(l.clicked_at) >= oneDayAgo).length;
  const weeklyLeads = leads.filter(l => new Date(l.clicked_at) >= oneWeekAgo).length;

  // Count by project type
  const projectTypeCounts = leads.reduce((acc, lead) => {
    acc[lead.project_type] = (acc[lead.project_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topProjectTypes = Object.entries(projectTypeCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Count by testimonial client
  const testimonialCounts = leads.reduce((acc, lead) => {
    const key = `${lead.client_name} - ${lead.project_type}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topTestimonials = Object.entries(testimonialCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === "new").length,
    contactedLeads: leads.filter(l => l.status === "contacted").length,
    convertedLeads: leads.filter(l => l.status === "converted").length,
    mobileLeads: leads.filter(l => l.device_type === "Mobile").length,
    desktopLeads: leads.filter(l => l.device_type === "Desktop").length,
    topTestimonials,
    topProjectTypes,
    weeklyLeads,
    dailyLeads,
  };
};
