import BindingThumbnail from "../BookThumbnails/BindingThumbnail";
import type { BookListProps } from "../../types/bookListProps";

function BookStack({ books, selectedBookId }: BookListProps) {
  return (
    <div>
      {books.map((book) => (
        <BindingThumbnail key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookStack;
