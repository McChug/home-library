import "./BookGrid.css";
import CoverThumbnail from "./CoverThumbnail";
import type { BookListProps } from "./../types/bookListProps";
import { Link } from "react-router";
import AddBookBtn from "./widgets/AddBookBtn";

function BookGrid({ books, selectedBookId }: BookListProps) {
  return (
    <>
      {books.length > 0 ? (
        <div className="book-grid">
          {books.map((book) => (
            <Link
              to={book.id === selectedBookId ? "/" : `/book/${book.id}`}
              className={`cover-thumbnail-wrapper ${book.id === selectedBookId ? "selected" : ""}`.trim()}
              key={book.id}
            >
              {book.id === selectedBookId ? (
                <CoverThumbnail book={null} />
              ) : (
                <CoverThumbnail book={book} />
              )}
            </Link>
          ))}
        </div>
      ) : (
        <>
          <p>No books to display</p>
        </>
      )}
      <AddBookBtn />
    </>
  );
}

export default BookGrid;
