import CoverThumbnail from "../BookThumbnail/CoverThumbnail";
import type { Book } from "../../types/Book";

function BookGrid({ books }: { books: Book[] }) {
  return (
    <div>
      {books.map((book) => (
        <CoverThumbnail key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;
