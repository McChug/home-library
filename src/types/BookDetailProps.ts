import type { Book, Genre, Series } from "./Book";

export interface BookDetailProps {
  book: Book | null;
  genres: Genre[];
  series?: { info: Series; books: Book[] };
}
