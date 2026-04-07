import type { Book } from "../../types/Book";

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
