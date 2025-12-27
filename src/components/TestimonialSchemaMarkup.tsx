import { Helmet } from "react-helmet-async";
import { VideoTestimonial, getYouTubeThumbnail, getYouTubeVideoId } from "@/hooks/useVideoTestimonials";

interface TestimonialSchemaMarkupProps {
  testimonials: VideoTestimonial[];
  singleTestimonial?: VideoTestimonial | null;
}

const TestimonialSchemaMarkup = ({ testimonials, singleTestimonial }: TestimonialSchemaMarkupProps) => {
  // Generate VideoObject schema for each testimonial
  const generateVideoSchema = (testimonial: VideoTestimonial) => {
    const videoId = getYouTubeVideoId(testimonial.youtube_url);
    return {
      "@type": "VideoObject",
      "name": `${testimonial.project_type} Interior Design Review - ${testimonial.client_name}`,
      "description": testimonial.testimonial_text,
      "thumbnailUrl": getYouTubeThumbnail(testimonial.youtube_url),
      "uploadDate": testimonial.created_at,
      "contentUrl": `https://www.youtube.com/watch?v=${videoId}`,
      "embedUrl": `https://www.youtube.com/embed/${videoId}`,
      "publisher": {
        "@type": "Organization",
        "name": "Interior Space",
        "logo": {
          "@type": "ImageObject",
          "url": "https://lovable.dev/logo.png"
        }
      }
    };
  };

  // Generate Review schema for each testimonial
  const generateReviewSchema = (testimonial: VideoTestimonial) => ({
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": testimonial.star_rating || 5,
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": testimonial.client_name
    },
    "reviewBody": testimonial.testimonial_text,
    "itemReviewed": {
      "@type": "Service",
      "name": `${testimonial.project_type} Interior Design`,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Interior Space"
      }
    }
  });

  // Aggregate rating calculation
  const averageRating = testimonials.length > 0
    ? testimonials.reduce((sum, t) => sum + (t.star_rating || 5), 0) / testimonials.length
    : 5;

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Interior Space",
    "description": "Premium interior design services for homes and offices",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": testimonials.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map(generateReviewSchema)
  };

  // Single testimonial page schema
  const singleTestimonialSchema = singleTestimonial ? {
    "@context": "https://schema.org",
    "@graph": [
      generateVideoSchema(singleTestimonial),
      generateReviewSchema(singleTestimonial)
    ]
  } : null;

  // Collection page schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      aggregateRatingSchema,
      ...testimonials.map(generateVideoSchema)
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(singleTestimonial ? singleTestimonialSchema : collectionSchema)}
      </script>
    </Helmet>
  );
};

export default TestimonialSchemaMarkup;
