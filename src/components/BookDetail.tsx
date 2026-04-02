import type { Book } from "../types/Book";

function BookDetail({ book }: { book: Book }) {
  return (
    <>
      <div>
        <p>{book.title}</p>
        <p>{book.author}</p>
      </div>
    </>
  );
}

export default BookDetail;
