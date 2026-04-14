import "./CoverThumbnail.css";
import type { Book } from "../../schemas/book.schema";
import { useBookCover } from "../../hooks/useBookCover";

function CoverThumbnail({ book }: { book: Book }) {
  const coverUrl = useBookCover(book?.id ?? "");

  return (
    <>
      <div className="cover">
        {coverUrl && <img src={coverUrl} alt={book.title + " cover art"} />}
        <p>{book.title}</p>
      </div>
    </>
  );
}

export default CoverThumbnail;
