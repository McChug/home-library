import type { Book } from "../schemas/book.schema.ts";
import type { Genre, Series } from "../schemas/library.schema.ts";

export interface BookDetailProps {
  book: Book | null;
  genres: Genre[];
  series: Series[];
}
