import { useEffect, useState } from "react";
import { loadCover } from "../storage/coverStorage";

export function useBookCover(bookId: string) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    let objectUrl: string | null = null;

    async function fetchCover() {
      const url = await loadCover(bookId);

      if (!isActive) return;

      objectUrl = url;
      setCoverUrl(objectUrl);
    }

    fetchCover();

    return () => {
      isActive = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [bookId]);

  return coverUrl;
}
