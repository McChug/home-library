import "./BookGrid.css";
import CoverThumbnail from "../BookThumbnails/CoverThumbnail";
import type { BookListProps } from "../../types/BookListProps";
import { Link } from "react-router";

function BookGrid({ books, selectedBookId }: BookListProps) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <Link
          to={book.id === selectedBookId ? "/" : `/book/${book.id}`}
          className={`cover-thumbnail-wrapper ${book.id === selectedBookId ? "selected" : ""}`.trim()}
          key={book.id}
        >
          <CoverThumbnail book={book} />
        </Link>
      ))}
    </div>
  );
}

export default BookGrid;
