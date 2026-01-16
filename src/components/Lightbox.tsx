import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Trash2, Download } from "lucide-react";
import { Photo } from "./PhotoCard";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onNavigate: (photo: Photo) => void;
}

export const Lightbox = ({
  photo,
  photos,
  onClose,
  onDelete,
  onNavigate,
}: LightboxProps) => {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(photos[currentIndex - 1]);
    }
  }, [hasPrev, currentIndex, photos, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      onNavigate(photos[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, photos, onNavigate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [onClose, handlePrev, handleNext]
  );

  const handleDownload = () => {
    if (!photo) return;
    const link = document.createElement("a");
    link.href = photo.url;
    link.download = photo.name;
    link.click();
  };

  useEffect(() => {
    if (photo) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [photo, handleKeyDown]);

  if (!photo) return null;

  return (
    <div className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <Download className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onDelete(photo.id);
              onClose();
            }}
            className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-destructive"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      {hasPrev && (
        <button
          onClick={handlePrev}
          className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={handleNext}
          className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Image */}
      <img
        src={photo.url}
        alt={photo.name}
        className="max-h-[85vh] max-w-[90vw] object-contain animate-scale-in"
      />

      {/* Photo info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <p className="text-sm text-white/80">{photo.name}</p>
        <p className="text-xs text-white/50">
          {photo.uploadedAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
