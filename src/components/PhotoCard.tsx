import { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Photo {
  id: string;
  url: string;
  name: string;
  uploadedAt: Date;
  width?: number;
  height?: number;
}

interface PhotoCardProps {
  photo: Photo;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export const PhotoCard = ({
  photo,
  isSelected,
  onSelect,
  onClick,
  onDelete,
}: PhotoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="photo-card masonry-item group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Skeleton loader */}
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      
      <img
        src={photo.url}
        alt={photo.name}
        className={cn(
          "w-full object-cover transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />

      {/* Overlay */}
      <div className="photo-card-overlay">
        {/* Selection checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(photo.id);
          }}
          className={cn(
            "absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200",
            isSelected
              ? "border-primary bg-primary text-primary-foreground"
              : isHovered
              ? "border-white bg-black/30 text-white"
              : "border-transparent bg-transparent"
          )}
        >
          {isSelected && <Check className="h-4 w-4" />}
        </button>

        {/* Delete button */}
        {isHovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(photo.id);
            }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
