"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageGridProps {
  images: {
    src: string;
    alt: string;
    href?: string;
  }[];
  columns?: 2 | 3 | 4;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  columns = 3,
}) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const gridClass = {
    2: "grid-cols-2 sm:grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[columns];

  return (
    <div className="relative">
      <div className={`grid ${gridClass} gap-4 my-8`}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-square cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              alt={image.alt}
              src={image.src}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="rounded-lg object-cover"
              loading={index < 6 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-[90%] max-w-3xl mx-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - just an X */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 text-white/80 hover:text-white z-10 p-4 text-xl"
              style={{ transform: 'translate(50%, -50%)' }}
            >
              ×
            </button>
            
            {/* Image */}
            <div className="relative aspect-auto">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={800}
                className="rounded-lg mx-auto"
                style={{ objectFit: 'contain', maxHeight: '80vh' }}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};