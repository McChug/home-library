import { useEffect, useState } from "react";
import { loadCover } from "../storage/coverStorage";

export function useBookCover(bookId: string) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    async function fetchCover() {
      objectUrl = await loadCover(bookId);
      setCoverUrl(objectUrl);
    }

    fetchCover();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [bookId]);

  return coverUrl;
}
