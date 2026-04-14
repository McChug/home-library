import { useEffect, useState } from "react";
import type { Library } from "../schemas/library.schema";
import { loadLibrary, saveLibrary } from "../storage/libraryStorage";
import type { Book } from "../schemas/book.schema";
import { saveCover } from "../storage/coverStorage";

export function useLibrary(
  inititalLibrary: Library,
): [Library, (updatedBook: Book, coverBlob?: Blob) => Promise<void>] {
  const [library, setLibrary] = useState<Library>(
    () => loadLibrary() ?? inititalLibrary,
  );

  useEffect(() => {
    saveLibrary(library);
  }, [library]);

  async function handleSaveBook(updatedBook: Book, coverBlob?: Blob) {
    if (coverBlob) {
      await saveCover(updatedBook.id, coverBlob);
    }

    setLibrary((prev) => {
      const bookExists = prev.books.some((b) => b.id === updatedBook.id);

      const updatedBooks = bookExists
        ? prev.books.map((b) => (b.id === updatedBook.id ? updatedBook : b))
        : [...prev.books, updatedBook];

      return { ...prev, books: updatedBooks };
    });
  }

  return [library, handleSaveBook] as const;
}
