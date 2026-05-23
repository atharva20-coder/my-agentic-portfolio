'use client';

import React from 'react';
import { ImageGrid } from "app/components/image-grid";

interface MemeGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export function MemeGallery({ images }: MemeGalleryProps) {
  return (
    <div className="min-h-screen">
      <ImageGrid columns={3} images={images} />
    </div>
  );
}