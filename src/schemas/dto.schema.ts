import * as z from "zod";

export const BookDtoSchema = z.object({
  title: z.string(),
  authors: z.array(z.object({ key: z.string() })).optional(),
  publish_date: z.string().optional(),
});

export type BookDto = z.infer<typeof BookDtoSchema>;
