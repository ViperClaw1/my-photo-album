import { Image, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onUploadClick: () => void;
}

export const EmptyState = ({ onUploadClick }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center animate-slide-up">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <Image className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <h2 className="mb-2 font-display text-2xl font-medium text-foreground">
        No photos yet
      </h2>
      
      <p className="mb-8 max-w-md text-muted-foreground">
        Upload your first photos to get started. Your memories are waiting to be organized.
      </p>
      
      <Button
        onClick={onUploadClick}
        size="lg"
        className="gap-2 rounded-full px-8"
      >
        <Upload className="h-5 w-5" />
        Upload photos
      </Button>
    </div>
  );
};
