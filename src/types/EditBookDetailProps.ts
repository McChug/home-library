import type { Book, Genre, Series } from "./Book";

export interface EditBookDetailProps {
  book: Book | null;
  genres: Genre[];
  series?: { info: Series; books: Book[] };
  onSave: (book: Book) => Promise<void>;
}
