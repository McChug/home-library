import type { Book } from "../schemas/book.schema.ts";
import type { Library, Series } from "../schemas/library.schema.ts";

export interface EditBookDetailProps {
  book: Book | null;
  library: Library;
  onSave: (
    book: Book,
    newSeries: Series | null,
    coverBlob: Blob | null,
  ) => void;
  onDelete: (bookId: string) => void;
}
