import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = "md",
  interactive = false,
  onChange,
  className 
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={cn("flex gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <button
          key={index}
          type="button"
          disabled={!interactive}
          onClick={() => handleClick(index)}
          className={cn(
            "focus:outline-none transition-colors",
            interactive && "cursor-pointer hover:scale-110"
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted-foreground/30"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
