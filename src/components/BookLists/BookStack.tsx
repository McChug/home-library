import BindingThumbnail from "../BookThumbnail/BindingThumbnail";
import type { Book } from "../../types/Book";

function BookStack({ books }: { books: Book[] }) {
  return (
    <div>
      {books.map((book) => (
        <BindingThumbnail key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookStack;
