import { useServiceGallery } from "@/hooks/useServiceGallery";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceGalleryProps {
  serviceSlug: string;
  fallbackImages?: { src: string; alt: string }[];
}

const ServiceGallery = ({ serviceSlug, fallbackImages = [] }: ServiceGalleryProps) => {
  const { data: images, isLoading, error } = useServiceGallery(serviceSlug);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-[300px] rounded-lg" />
        ))}
      </div>
    );
  }

  // Use database images if available, otherwise use fallback images
  const displayImages = images && images.length > 0 
    ? images.map(img => ({ src: img.image_url, alt: img.alt_text }))
    : fallbackImages;

  if (displayImages.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No images available for this service yet.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
      {displayImages.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className="w-full h-[300px] object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default ServiceGallery;
