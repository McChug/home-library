import type { Book } from "../../types/book";

function BindingThumbnail({ book }: { book: Book }) {
  return (
    <>
      <div>
        <p>{book.title}</p>
      </div>
    </>
  );
}

export default BindingThumbnail;
