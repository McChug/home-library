import type { Book } from "../schemas/book.schema";

export interface BookListProps {
  books: Book[];
  selectedBookId: string | null;
}
