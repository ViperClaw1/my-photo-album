import { useState } from "react";
import { Header } from "@/components/Header";
import { PhotoGrid } from "@/components/PhotoGrid";
import { UploadZone } from "@/components/UploadZone";
import { Lightbox } from "@/components/Lightbox";
import { EmptyState } from "@/components/EmptyState";
import { usePhotos } from "@/hooks/usePhotos";
import { Photo } from "@/components/PhotoCard";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const {
    photos,
    selectedPhotos,
    searchQuery,
    setSearchQuery,
    addPhotos,
    deletePhoto,
    toggleSelectPhoto,
    deleteSelectedPhotos,
    clearSelection,
  } = usePhotos();

  const hasSelection = selectedPhotos.size > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header
        onUploadClick={() => setShowUpload(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Selection bar */}
      {hasSelection && (
        <div className="sticky top-[73px] z-40 flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground animate-slide-up">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSelection}
              className="h-9 w-9 rounded-full text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
            <span className="font-medium">
              {selectedPhotos.size} selected
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={deleteSelectedPhotos}
            className="gap-2 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      )}

      {/* Main content */}
      <main className="p-4 md:p-6">
        {photos.length === 0 && !searchQuery ? (
          <EmptyState onUploadClick={() => setShowUpload(true)} />
        ) : photos.length === 0 && searchQuery ? (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
            <p className="text-lg text-muted-foreground">
              No photos found for "{searchQuery}"
            </p>
          </div>
        ) : (
          <PhotoGrid
            photos={photos}
            selectedPhotos={selectedPhotos}
            onSelectPhoto={toggleSelectPhoto}
            onPhotoClick={setLightboxPhoto}
            onDeletePhoto={deletePhoto}
          />
        )}
      </main>

      {/* Upload modal */}
      <UploadZone
        isVisible={showUpload}
        onClose={() => setShowUpload(false)}
        onFilesSelected={addPhotos}
      />

      {/* Lightbox */}
      <Lightbox
        photo={lightboxPhoto}
        photos={photos}
        onClose={() => setLightboxPhoto(null)}
        onDelete={deletePhoto}
        onNavigate={setLightboxPhoto}
      />
    </div>
  );
};

export default Index;
