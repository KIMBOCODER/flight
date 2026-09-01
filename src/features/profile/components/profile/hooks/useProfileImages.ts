import {
  useCallback,
  useState,
} from "react";

import type { ImageType } from "../types/upload.types";

export function useProfileImages() {
  const [coverSrc, setCoverSrc] =
    useState<string | null>(null);

  const [avatarSrc, setAvatarSrc] =
    useState<string | null>(null);

  const readImage = useCallback(
    (
      file: File,
      type: ImageType
    ) => {
      if (!file.type.startsWith("image/")) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const result =
          event.target?.result;

        if (typeof result !== "string") {
          return;
        }

        if (type === "cover") {
          setCoverSrc(result);
        } else {
          setAvatarSrc(result);
        }
      };

      reader.readAsDataURL(file);
    },
    []
  );

  return {
    coverSrc,
    avatarSrc,
    setCoverSrc,
    setAvatarSrc,
    readImage,
  };
}