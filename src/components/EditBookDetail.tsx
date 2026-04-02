import type { Book } from "../types/Book";

function EditBookDetail({ book }: { book: Book }) {
  return (
    <div>
      <input value={book.title} />
      <input value={book.author} />
    </div>
  );
}

export default EditBookDetail;
