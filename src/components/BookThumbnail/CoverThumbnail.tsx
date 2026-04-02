import type { Book } from "../../types/Book";

function CoverThumbnail({ book }: { book: Book }) {
  return (
    <>
      <div>
        <p>{book.title}</p>
      </div>
    </>
  );
}

export default CoverThumbnail;
