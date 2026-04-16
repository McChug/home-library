import { BookDtoSchema, type BookDto } from "../schemas/dto.schema";
import type { BookFormFields } from "../types/bookForm";
import type { Result } from "../types/fetch";

export function parseBookDto(data: unknown): Result<BookDto> {
  if (isEmptyObject(data)) {
    return {
      ok: false,
      error: { kind: "empty", message: "No book data returned" },
    };
  }

  const result = BookDtoSchema.safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      error: { kind: "schema", message: result.error.message },
    };
  }

  return { ok: true, data: result.data };
}

function isEmptyObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  );
}

export function bookDtoToPayload(
  dto: BookDto,
  isbn: string,
): Partial<BookFormFields> {
  const bookData = Object.values(dto)[0]; // this line extracts the actual book data from the json because it comes wrapped in the isbn

  const publishedDate = bookData.publish_date
    ? new Date(bookData.publish_date).toISOString().split("T")[0]
    : "";

  return {
    title: bookData.title,
    author: bookData.authors?.[0]?.name ?? "",
    publishedDate,
    isbn,
    coverPreviewUrl:
      bookData.cover?.medium ??
      bookData.cover?.large ??
      bookData.cover?.small ??
      null,
  };
}
