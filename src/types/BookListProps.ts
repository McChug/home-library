import type { Book } from "./Book";

export interface BookListProps {
  books: Book[];
  select: (book: Book) => void;
  selectedBookId: string | null;
}
