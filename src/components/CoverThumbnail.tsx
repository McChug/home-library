import "./BookGrid.css";
import type { Book } from "../schemas/book.schema";
import { useBookCover } from "../hooks/useBookCover";

function CoverThumbnail({ book }: { book: Book | null }) {
  const coverUrl = useBookCover(book?.id ?? "");

  return (
    <>
      <div className="cover">
        {book !== null ? (
          <>
            {coverUrl && <img src={coverUrl} alt={`${book.title} cover art`} />}
            <p>{book.title}</p>
          </>
        ) : (
          <p className="selected-cover">Return to Shelf</p>
        )}
      </div>
    </>
  );
}

export default CoverThumbnail;
