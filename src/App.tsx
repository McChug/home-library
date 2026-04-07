import { useState } from "react";
import "./App.css";
import { books as initialBooks } from "./seed-data";
import type { Book } from "./types/Book";
import BookGrid from "./components/BookLists/BookGrid";
import Search from "./components/Search";
import BookDetail from "./components/BookDetail";

function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const selectedBookId = selectedBook?.id ?? null;

  function select(book: Book) {
    if (book.id === selectedBookId) {
      setSelectedBook(null);
    } else {
      setSelectedBook(book);
    }
  }

  return (
    <main>
      <section className="content">
        <h1>Home Library Catalog</h1>
        <Search />
        {selectedBook && (
          <div>
            <button onClick={() => setSelectedBook(null)}>Back</button>
            <BookDetail book={selectedBook} />
          </div>
        )}
      </section>
      <section className="book-list">
        <BookGrid
          books={books}
          select={select}
          selectedBookId={selectedBookId}
        />
      </section>
    </main>
  );
}

export default App;
