"use client";

import { useState } from "react";
import Label from "./Label";
import Image from "next/image";

const ImagePreview = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedImage(file);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {imagePreview && (
        <div className="flex justify-center mb4">
          <Image
            src={imagePreview}
            alt="Pre-visualização da imagem"
            className="w-[494px] h-[494px] object-cover"
            width={494}
            height={494}
          />
        </div>
      )}
      <Label htmlFor="image" text="Selecione uma imagem" />
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleImageChange}
        className="p-2 border border-zinc-300 rounded w-full text-sm placeholder:text-zinc-500 fovus:ring-0 focus:outline-none"
      />
      {selectedImage && (
        <input type="hidden" name="imageFile" value={selectedImage.name} />
      )}
    </div>
  );
};

export default ImagePreview;
