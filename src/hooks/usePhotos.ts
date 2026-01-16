import { useState, useCallback, useMemo } from "react";
import { Photo } from "@/components/PhotoCard";

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Sample photos for demo
const samplePhotos: Photo[] = [
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    name: "Mountain landscape",
    uploadedAt: new Date("2024-01-15"),
  },
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    name: "Nature scene",
    uploadedAt: new Date("2024-01-14"),
  },
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    name: "Lake view",
    uploadedAt: new Date("2024-01-13"),
  },
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    name: "Foggy mountains",
    uploadedAt: new Date("2024-01-12"),
  },
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
    name: "Forest path",
    uploadedAt: new Date("2024-01-11"),
  },
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
    name: "Waterfall",
    uploadedAt: new Date("2024-01-10"),
  },
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
    name: "Sunset valley",
    uploadedAt: new Date("2024-01-09"),
  },
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1518173946687-a4c036bc1e95?w=800",
    name: "Beach sunset",
    uploadedAt: new Date("2024-01-08"),
  },
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    name: "Desert dunes",
    uploadedAt: new Date("2024-01-07"),
  },
  {
    id: generateId(),
    url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
    name: "Green hills",
    uploadedAt: new Date("2024-01-06"),
  },
];

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;
    const query = searchQuery.toLowerCase();
    return photos.filter((photo) =>
      photo.name.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  const addPhotos = useCallback((files: File[]) => {
    const newPhotos: Photo[] = files.map((file) => ({
      id: generateId(),
      url: URL.createObjectURL(file),
      name: file.name,
      uploadedAt: new Date(),
    }));

    setPhotos((prev) => [...newPhotos, ...prev]);
  }, []);

  const deletePhoto = useCallback((id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    setSelectedPhotos((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleSelectPhoto = useCallback((id: string) => {
    setSelectedPhotos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const deleteSelectedPhotos = useCallback(() => {
    setPhotos((prev) =>
      prev.filter((photo) => !selectedPhotos.has(photo.id))
    );
    setSelectedPhotos(new Set());
  }, [selectedPhotos]);

  const clearSelection = useCallback(() => {
    setSelectedPhotos(new Set());
  }, []);

  return {
    photos: filteredPhotos,
    selectedPhotos,
    searchQuery,
    setSearchQuery,
    addPhotos,
    deletePhoto,
    toggleSelectPhoto,
    deleteSelectedPhotos,
    clearSelection,
  };
};
