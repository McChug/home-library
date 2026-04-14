import { BookDtoSchema, type BookDto } from "../schemas/dto.schema";
import type { BookFormFields } from "../types/bookForm";
import type { Result } from "../types/fetch";

export function parseBookDto(data: unknown): Result<BookDto> {
  const result = BookDtoSchema.safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      error: { kind: "schema", message: result.error.message },
    };
  }

  return { ok: true, data: result.data };
}

export function bookDtoToPayload(
  dto: BookDto,
  isbn: string,
): Partial<BookFormFields> {
  const publishedDate = dto.publish_date
    ? new Date(dto.publish_date).toISOString().split("T")[0]
    : "";

  return {
    title: dto.title,
    author: "",
    publishedDate,
    isbn,
  };
}
