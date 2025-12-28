import { useState } from "react";
import { Play, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useVideoTestimonials, getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/hooks/useVideoTestimonials";
import TestimonialCTA from "@/components/TestimonialCTA";
import TrustBadges from "@/components/TrustBadges";
import StarRating from "@/components/StarRating";

interface VideoTestimonialsProps {
  isFullPage?: boolean;
  showTrustBadges?: boolean;
}

const VideoTestimonials = ({ isFullPage = false, showTrustBadges = true }: VideoTestimonialsProps) => {
  const { data: testimonials, isLoading, error } = useVideoTestimonials();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [thumbnailError, setThumbnailError] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const handleThumbnailError = (id: string) => {
    setThumbnailError(prev => new Set(prev).add(id));
  };

  const handlePlayClick = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  if (isLoading) {
    return (
      <section className={`relative bg-foreground ${isFullPage ? "pt-16" : "py-16 md:py-24"}`}>
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    return (
      <section className={`relative bg-foreground ${isFullPage ? "pt-16" : "py-16 md:py-24"}`}>
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-background/70">No testimonials available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative bg-foreground ${isFullPage ? "pt-16" : "py-16 md:py-24"}`}>
      {!isFullPage && (
        <div className="container mx-auto px-4 mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
            Client <span className="text-primary">Stories</span>
          </h2>
          <p className="text-background/70 max-w-2xl mx-auto mb-4">
            Watch what our clients have to say about their transformation journey with us.
          </p>
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => navigate("/testimonials")}
          >
            View All Stories
          </Button>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Grid Layout: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="flex flex-col bg-background/5 rounded-xl overflow-hidden hover:bg-background/10 transition-colors"
            >
              {/* 16:9 Video/Thumbnail Container */}
              <div className="relative aspect-video w-full">
                {playingId === testimonial.id ? (
                  <iframe
                    src={`${getYouTubeEmbedUrl(testimonial.youtube_url)}&autoplay=1`}
                    title={`${testimonial.client_name} - ${testimonial.project_type} interior design testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                  />
                ) : (
                  <>
                    <img
                      src={thumbnailError.has(testimonial.id) 
                        ? `https://img.youtube.com/vi/${testimonial.youtube_url.split('/').pop()?.split('?')[0]}/hqdefault.jpg`
                        : getYouTubeThumbnail(testimonial.youtube_url)
                      }
                      alt={`${testimonial.client_name} - ${testimonial.project_type} testimonial`}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => handleThumbnailError(testimonial.id)}
                      loading="lazy"
                    />
                    {/* Play Button Overlay */}
                    <button
                      onClick={() => handlePlayClick(testimonial.id)}
                      className="absolute inset-0 flex items-center justify-center bg-foreground/30 hover:bg-foreground/40 transition-colors group"
                      aria-label={`Play ${testimonial.client_name}'s testimonial`}
                    >
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </button>
                    {/* Project Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                        {testimonial.project_type}
                      </span>
                      {testimonial.location && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-background/20 backdrop-blur-sm text-background text-xs rounded-full">
                          <MapPin className="w-3 h-3" />
                          {testimonial.location}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Content Below Image */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Client Name & Rating */}
                <h3 className="text-lg font-bold text-background mb-1">
                  {testimonial.client_name}
                </h3>
                <StarRating 
                  rating={testimonial.star_rating || 5} 
                  size="sm" 
                  className="mb-2" 
                />

                {/* Testimonial Text */}
                <p className="text-background/80 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                  "{testimonial.testimonial_text}"
                </p>

                {/* CTA Buttons */}
                <TestimonialCTA 
                  variant="card" 
                  projectType={testimonial.project_type}
                  clientName={testimonial.client_name}
                  testimonialId={testimonial.id}
                  pageSource={isFullPage ? "Testimonials Page" : "Home Page"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      {showTrustBadges && (
        <div className="mt-10">
          <TrustBadges variant="dark" />
        </div>
      )}
    </section>
  );
};

export default VideoTestimonials;
