import * as z from "zod";
import { BookSchema } from "./book.schema";

export const GenreSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const SeriesSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const LibrarySchema = z.object({
  books: z.array(BookSchema),
  genres: z.array(GenreSchema),
  series: z.array(SeriesSchema),
});

export type Library = z.infer<typeof LibrarySchema>;
export type Genre = z.infer<typeof GenreSchema>;
export type Series = z.infer<typeof SeriesSchema>;
