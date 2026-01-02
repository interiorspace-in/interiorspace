import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  display_order: number;
  is_enabled: boolean;
}

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_enabled", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }

      return data as Service[];
    },
  });
};
