import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronUp, ChevronDown, Volume2, VolumeX, Loader2, MapPin } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const [activeVideoLoaded, setActiveVideoLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToIndex = useCallback((index: number) => {
    if (!testimonials || index < 0 || index >= testimonials.length) return;
    
    const container = containerRef.current;
    if (!container) return;

    const videoHeight = container.clientHeight;
    container.scrollTo({
      top: index * videoHeight,
      behavior: "smooth",
    });
    setActiveIndex(index);
    setActiveVideoLoaded(false);
  }, [testimonials]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || !testimonials) return;

    const scrollPosition = container.scrollTop;
    const videoHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / videoHeight);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < testimonials.length) {
      setActiveIndex(newIndex);
      setActiveVideoLoaded(false);
    }
  }, [activeIndex, testimonials]);

  // Load only the active video iframe
  useEffect(() => {
    if (!testimonials) return;
    
    const toLoad = new Set<number>();
    toLoad.add(activeIndex);
    
    if (JSON.stringify([...toLoad]) !== JSON.stringify([...loadedVideos])) {
      setLoadedVideos(toLoad);
    }
  }, [activeIndex, testimonials]);

  // Preload next and previous thumbnails
  useEffect(() => {
    if (!testimonials) return;
    
    [activeIndex - 1, activeIndex + 1].forEach((idx) => {
      if (idx >= 0 && idx < testimonials.length) {
        const img = new Image();
        img.src = getYouTubeThumbnail(testimonials[idx].youtube_url);
      }
    });
  }, [activeIndex, testimonials]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollToIndex(activeIndex + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollToIndex(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToIndex]);

  const toggleMute = () => setIsMuted(!isMuted);

  const handleThumbnailError = (index: number) => {
    setThumbnailError(prev => new Set(prev).add(index));
  };

  const containerHeight = isFullPage ? "h-[calc(100vh-4rem)]" : "h-[600px] md:h-[700px]";

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

      <div className="flex justify-center items-center">
        {/* Phone Frame Container */}
        <div className="relative w-full max-w-[360px] md:max-w-[400px]">
          {/* Phone Frame (Desktop only) */}
          <div className="hidden md:block absolute -inset-3 rounded-[3rem] border-[12px] border-background/10 pointer-events-none z-20" />
          <div className="hidden md:block absolute -inset-3 rounded-[3rem] bg-gradient-to-b from-background/5 to-transparent pointer-events-none z-10" />
          
          {/* Video Container */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className={`${containerHeight} overflow-y-scroll snap-y snap-mandatory scrollbar-hide rounded-2xl md:rounded-[2.5rem] relative`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`${containerHeight} snap-start snap-always relative flex-shrink-0`}
              >
                {/* Fallback Thumbnail (always render for stability) */}
                <img
                  src={thumbnailError.has(index) 
                    ? `https://img.youtube.com/vi/${testimonial.youtube_url.split('/').pop()?.split('?')[0]}/hqdefault.jpg`
                    : getYouTubeThumbnail(testimonial.youtube_url)
                  }
                  alt={`${testimonial.client_name} - ${testimonial.project_type} testimonial`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    loadedVideos.has(index) && activeVideoLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                  onError={() => handleThumbnailError(index)}
                  loading={Math.abs(index - activeIndex) <= 1 ? "eager" : "lazy"}
                />

                {/* YouTube Embed (only for active video) */}
                {loadedVideos.has(index) && (
                  <iframe
                    src={`${getYouTubeEmbedUrl(testimonial.youtube_url)}&mute=${isMuted ? 1 : 0}`}
                    title={`${testimonial.client_name} - ${testimonial.project_type} interior design testimonial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    onLoad={() => index === activeIndex && setActiveVideoLoaded(true)}
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-foreground/30 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 pb-24">
                  {/* Project Type Badge */}
                  <div className="mb-2 flex items-center gap-2 flex-wrap pointer-events-none">
                    <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                      {testimonial.project_type}
                    </span>
                    {testimonial.location && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-background/20 backdrop-blur-sm text-background text-xs rounded-full">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </span>
                    )}
                  </div>

                  {/* Client Name & Rating */}
                  <div className="pointer-events-none">
                    <h3 className="text-xl md:text-2xl font-bold text-background mb-1">
                      {testimonial.client_name}
                    </h3>
                    <StarRating 
                      rating={testimonial.star_rating || 5} 
                      size="sm" 
                      className="mb-2" 
                    />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-background/90 text-sm md:text-base leading-relaxed line-clamp-2 mb-4 pointer-events-none">
                    "{testimonial.testimonial_text}"
                  </p>

                  {/* CTA Buttons */}
                  <TestimonialCTA variant="overlay" projectType={testimonial.project_type} />
                </div>

                {/* Side Controls */}
                <div className="absolute right-4 bottom-28 flex flex-col gap-4 z-30">
                  {/* Mute/Unmute */}
                  <button
                    onClick={toggleMute}
                    className="w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/30 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                {/* Progress Dots */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
                  {testimonials.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => scrollToIndex(dotIndex)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        dotIndex === activeIndex
                          ? "bg-primary h-6"
                          : "bg-background/40 hover:bg-background/60"
                      }`}
                      aria-label={`Go to video ${dotIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background transition-all ${
              activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-background/30"
            }`}
            aria-label="Previous video"
          >
            <ChevronUp className="w-6 h-6" />
          </button>

          <button
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === testimonials.length - 1}
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background transition-all ${
              activeIndex === testimonials.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-background/30"
            }`}
            aria-label="Next video"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Video Counter */}
      <div className="text-center mt-6">
        <span className="text-background/60 text-sm">
          {activeIndex + 1} / {testimonials.length}
        </span>
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
