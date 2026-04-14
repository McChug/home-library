import "./BookGrid.css";
import CoverThumbnail from "./CoverThumbnail";
import type { BookListProps } from "./../types/bookListProps";
import { Link } from "react-router";

function BookGrid({ books, selectedBookId }: BookListProps) {
  return (
    <div className="book-grid">
      {books.length > 0 ? (
        books.map((book) => (
          <Link
            to={book.id === selectedBookId ? "/" : `/book/${book.id}`}
            className={`cover-thumbnail-wrapper ${book.id === selectedBookId ? "selected" : ""}`.trim()}
            key={book.id}
          >
            <CoverThumbnail book={book} />
          </Link>
        ))
      ) : (
        <p>No books to display</p>
      )}
    </div>
  );
}

export default BookGrid;
