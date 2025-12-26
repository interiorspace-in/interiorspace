import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface VideoTestimonial {
  id: string;
  client_name: string;
  project_type: string;
  testimonial_text: string;
  youtube_url: string;
  is_enabled: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Extract YouTube video ID from various URL formats
export const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Get YouTube embed URL
export const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
};

// Get YouTube thumbnail
export const getYouTubeThumbnail = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const useVideoTestimonials = () => {
  return useQuery({
    queryKey: ["video-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("video_testimonials")
        .select("*")
        .eq("is_enabled", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as VideoTestimonial[];
    },
  });
};

export const useAllVideoTestimonials = () => {
  return useQuery({
    queryKey: ["all-video-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("video_testimonials")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as VideoTestimonial[];
    },
  });
};
