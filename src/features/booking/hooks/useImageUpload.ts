import { useState } from "react";

export function useImageUpload() {
  const [image, setImage] =
    useState<string | null>(null);

  const uploadImage = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      setImage(
        event.target?.result as string
      );
    };

    reader.readAsDataURL(file);
  };

  return {
    image,
    setImage,
    uploadImage,
  };
}