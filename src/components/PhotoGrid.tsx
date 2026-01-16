import { PhotoCard, Photo } from "./PhotoCard";

interface PhotoGridProps {
  photos: Photo[];
  selectedPhotos: Set<string>;
  onSelectPhoto: (id: string) => void;
  onPhotoClick: (photo: Photo) => void;
  onDeletePhoto: (id: string) => void;
}

export const PhotoGrid = ({
  photos,
  selectedPhotos,
  onSelectPhoto,
  onPhotoClick,
  onDeletePhoto,
}: PhotoGridProps) => {
  if (photos.length === 0) {
    return null;
  }

  return (
    <div className="masonry-grid animate-fade-in">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isSelected={selectedPhotos.has(photo.id)}
          onSelect={onSelectPhoto}
          onClick={() => onPhotoClick(photo)}
          onDelete={onDeletePhoto}
        />
      ))}
    </div>
  );
};
