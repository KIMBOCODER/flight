import { useState } from "react";

export function useProfilePreview() {
  const [showPreview, setShowPreview] =
    useState(false);

  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  return {
    showPreview,
    togglePreview,
  };
}