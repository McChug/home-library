import type { Book } from "../schemas/book.schema.ts";
import type { Genre, Series } from "../schemas/library.schema.ts";

export interface EditBookDetailProps {
  book: Book | null;
  genres: Genre[];
  series: Series[];
  onSave: (book: Book) => void;
}
