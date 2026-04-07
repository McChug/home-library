import type { Book } from "./Book";

export interface BookListProps {
  books: Book[];
  selectedBookId: string | null;
}
