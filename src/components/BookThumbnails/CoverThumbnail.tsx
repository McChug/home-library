import "./CoverThumbnail.css";
import type { Book } from "../../types/Book";

function CoverThumbnail({ book }: { book: Book }) {
  return (
    <>
      <div className="cover">
        {book.coverUrl && (
          <img src={book.coverUrl} alt={book.title + " cover art"} />
        )}
        <p>{book.title}</p>
      </div>
    </>
  );
}

export default CoverThumbnail;
