import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ServiceGalleryImage {
  id: string;
  service_slug: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_enabled: boolean;
}

export const useServiceGallery = (serviceSlug: string) => {
  return useQuery({
    queryKey: ["service-gallery", serviceSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_gallery_images")
        .select("*")
        .eq("service_slug", serviceSlug)
        .eq("is_enabled", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as ServiceGalleryImage[];
    },
  });
};
