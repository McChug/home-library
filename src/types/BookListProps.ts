import type { Book } from "./Book";

export interface BookListProps {
  books: Book[];
  selectedBook: Book | null;
}
