import "./BookGrid.css";
import CoverThumbnail from "../BookThumbnails/CoverThumbnail";
import type { BookListProps } from "../../types/BookListProps";

function BookGrid({ books, select, selectedBookId }: BookListProps) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <button
          className={`cover-thumbnail-wrapper ${book.id === selectedBookId ? "selected" : ""}`.trim()}
          key={book.id}
          onClick={() => select(book)}
        >
          <CoverThumbnail book={book} />
        </button>
      ))}
    </div>
  );
}

export default BookGrid;
