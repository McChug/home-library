import * as z from "zod";

// These Zod schemas were made in-part from Claude based on my types

const DateFromString = z.string().transform((val) => new Date(val));

const ReadthroughSchema = z.object({
  finishedAt: DateFromString,
  rating: z.number().optional(),
  notes: z.string().optional(),
});

const UserBookOwnershipSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("unowned") }),
  z.object({ kind: z.literal("physical") }),
  z.object({
    kind: z.literal("digital"),
    platform: z.string(),
  }),
]);

const BaseBookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  isbn: z.string().optional(),
  // coverUrl: z.string().optional(),
  publishedDate: DateFromString.optional(),
  genreIds: z.array(z.string()),
  userData: z.object({
    ownership: UserBookOwnershipSchema,
    readthroughs: z.array(ReadthroughSchema).optional(),
    notes: z.string().optional(),
  }),
});

const StandaloneBookSchema = BaseBookSchema.extend({
  kind: z.literal("standalone"),
});

const SeriesBookSchema = BaseBookSchema.extend({
  kind: z.literal("series"),
  seriesId: z.string(),
  seriesOrder: z.number(),
});

export const BookSchema = z.discriminatedUnion("kind", [
  StandaloneBookSchema,
  SeriesBookSchema,
]);

export type Book = z.infer<typeof BookSchema>;
export type Readthrough = z.infer<typeof ReadthroughSchema>;
export type UserBookOwnership = z.infer<typeof UserBookOwnershipSchema>;
