import { useState } from "react";
import "./App.css";
import { books as initialBooks } from "./seed-data";
import type { Book } from "./types/Book";
import BookGrid from "./components/BookLists/BookGrid";
import Search from "./components/Search";
import BookDetail from "./components/BookDetail";
import { Link, useParams } from "react-router";

function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const { bookId } = useParams();

  const selectedBook = books.find((b) => b.id === bookId) ?? null;
  const selectedBookId = selectedBook?.id ?? null;

  return (
    <main>
      <section className="content">
        <h1>Home Library Catalog</h1>
        <Search />
        {selectedBook && (
          <div>
            <Link to="/">Back</Link>
            <BookDetail book={selectedBook} />
          </div>
        )}
      </section>
      <section className="book-list">
        <BookGrid books={books} selectedBookId={selectedBookId} />
      </section>
    </main>
  );
}

export default App;
