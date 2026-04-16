import * as z from "zod";

const BookDataSchema = z.object({
  title: z.string(),
  authors: z.array(z.object({ url: z.string(), name: z.string() })).optional(),
  publish_date: z.string().optional(),
  cover: z
    .object({
      small: z.string().optional(),
      medium: z.string().optional(),
      large: z.string().optional(),
    })
    .optional(),
});

export const BookDtoSchema = z
  .record(z.string(), BookDataSchema)
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one book is required",
  });

export type BookDto = z.infer<typeof BookDtoSchema>;
