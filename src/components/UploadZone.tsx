import { useCallback, useState, useRef } from "react";
import { Upload, Image, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const UploadZone = ({ onFilesSelected, isVisible, onClose }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (files.length > 0) {
        onFilesSelected(files);
        onClose();
      }
    },
    [onFilesSelected, onClose]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((file) =>
        file.type.startsWith("image/")
      );

      if (files.length > 0) {
        onFilesSelected(files);
        onClose();
      }
    },
    [onFilesSelected, onClose]
  );

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="relative w-full max-w-xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-lg transition-colors hover:bg-muted"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div
          className={cn(
            "upload-zone flex flex-col items-center justify-center gap-6 rounded-2xl bg-card p-12 text-center",
            isDragging && "upload-zone-active"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-full transition-colors",
              isDragging ? "bg-primary/20" : "bg-muted"
            )}
          >
            {isDragging ? (
              <Upload className="h-10 w-10 text-primary" />
            ) : (
              <Image className="h-10 w-10 text-muted-foreground" />
            )}
          </div>

          <div>
            <h3 className="font-display text-xl font-medium text-foreground">
              {isDragging ? "Drop your photos here" : "Upload photos"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Drag and drop your photos here, or click to browse
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />

          <Button
            onClick={handleBrowseClick}
            className="rounded-full px-8"
            size="lg"
          >
            Browse files
          </Button>

          <p className="text-xs text-muted-foreground">
            Supports JPG, PNG, GIF, WEBP
          </p>
        </div>
      </div>
    </div>
  );
};
