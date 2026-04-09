import type { Book } from "../types/Book";
import type { BookFormErrors, BookFormFields } from "../types/BookForm";

export function bookToFields(book: Book | null): BookFormFields {
  if (!book) {
    return {
      title: "",
      author: "",
      isbn: "",
      coverUrl: "",
      publishedDate: "",
      ownershipKind: "unowned",
      ownershipPlatform: "",
      notes: "",
    };
  }
  return {
    title: book.title,
    author: book.author,
    isbn: book.isbn ?? "",
    coverUrl: book.coverUrl ?? "",
    publishedDate: book.publishedDate
      ? book.publishedDate.toISOString().slice(0, 10)
      : "",
    ownershipKind: book.userData.ownership.kind,
    ownershipPlatform:
      book.userData.ownership.kind === "digital"
        ? book.userData.ownership.platform
        : "",
    notes: book.userData.notes ?? "",
  };
}

export function validate(fields: BookFormFields): BookFormErrors {
  const errors: BookFormErrors = {};

  if (!fields.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!fields.author.trim()) {
    errors.author = "Author is required.";
  }

  if (
    fields.isbn &&
    !/^\d{9}[\dX]$|^\d{13}$/.test(fields.isbn.replace(/-/g, ""))
  ) {
    errors.isbn = "ISBN must be a valid 10- or 13-digit number.";
  }

  if (
    fields.coverUrl &&
    !/^https?:\/\/.+/.test(fields.coverUrl.trim()) &&
    !/^\/book-covers\/.+/.test(fields.coverUrl.trim())
  ) {
    errors.coverUrl =
      "Cover URL must start with http://, https://, or /book-covers/.";
  }

  if (fields.publishedDate && isNaN(Date.parse(fields.publishedDate))) {
    errors.publishedDate = "Published date is not a valid date.";
  }

  if (fields.ownershipKind === "digital" && !fields.ownershipPlatform.trim()) {
    errors.ownershipPlatform = "Platform is required for digital books.";
  }

  return errors;
}

export function fieldsToBook(original: Book, fields: BookFormFields): Book {
  const ownership =
    fields.ownershipKind === "digital"
      ? { kind: "digital" as const, platform: fields.ownershipPlatform.trim() }
      : { kind: fields.ownershipKind as "unowned" | "physical" };

  const base = {
    ...original,
    title: fields.title.trim(),
    author: fields.author.trim(),
    isbn: fields.isbn.trim() || undefined,
    coverUrl: fields.coverUrl.trim() || undefined,
    publishedDate: fields.publishedDate
      ? new Date(fields.publishedDate)
      : undefined,
    userData: {
      ...original.userData,
      ownership,
      notes: fields.notes.trim() || undefined,
    },
  };

  return base;
}
