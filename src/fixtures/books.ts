import type { Book } from "../schemas/book.schema";
import { SERIES_IDS } from "./series";

export const books: Book[] = [
  // -----------------------------------------------------------------------
  // The Lord of the Rings (series)
  // -----------------------------------------------------------------------
  {
    id: "fellowship",
    kind: "series",
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    publishedDate: new Date("1954-07-29"),
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.LOTR,
    seriesOrder: 1,
    userData: {
      ownership: { kind: "hardcover" },
      readthroughs: [
        { finishedAt: new Date("2021-03-14"), rating: 5 },
        {
          finishedAt: new Date("2023-12-01"),
          rating: 5,
          notes: "Even better the second time.",
        },
      ],
      notes: "Annotated edition.",
    },
  },
  {
    id: "two-towers",
    kind: "series",
    title: "The Two Towers",
    author: "J.R.R. Tolkien",
    publishedDate: new Date("1954-11-11"),
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.LOTR,
    seriesOrder: 2,
    userData: {
      ownership: { kind: "hardcover" },
      readthroughs: [{ finishedAt: new Date("2021-04-02"), rating: 5 }],
    },
  },
  {
    id: "return-of-the-king",
    kind: "series",
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    publishedDate: new Date("1955-10-20"),
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.LOTR,
    seriesOrder: 3,
    userData: {
      ownership: { kind: "hardcover" },
      readthroughs: [{ finishedAt: new Date("2021-04-20"), rating: 5 }],
    },
  },

  // -----------------------------------------------------------------------
  // The Stormlight Archive (series)
  // -----------------------------------------------------------------------
  {
    id: "way-of-kings",
    kind: "series",
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    publishedDate: new Date("2010-08-31"),
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.STORMLIGHT,
    seriesOrder: 1,
    userData: {
      ownership: { kind: "digital", platform: "Kindle" },
      readthroughs: [
        {
          finishedAt: new Date("2022-08-10"),
          rating: 5,
          notes: "Kaladin is one of the best characters in fiction.",
        },
      ],
    },
  },
  {
    id: "words-of-radiance",
    kind: "series",
    title: "Words of Radiance",
    author: "Brandon Sanderson",
    publishedDate: new Date("2014-03-04"),
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.STORMLIGHT,
    seriesOrder: 2,
    userData: {
      ownership: { kind: "digital", platform: "Kindle" },
      readthroughs: [{ finishedAt: new Date("2022-09-15"), rating: 5 }],
    },
  },
  {
    id: "oathbringer",
    kind: "series",
    title: "Oathbringer",
    author: "Brandon Sanderson",
    publishedDate: new Date("2017-11-14"),
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.STORMLIGHT,
    seriesOrder: 3,
    userData: {
      ownership: { kind: "digital", platform: "Kindle" },
      readthroughs: [{ finishedAt: new Date("2022-11-03"), rating: 4 }],
    },
  },
  {
    id: "rhythm-of-war",
    kind: "series",
    title: "Rhythm of War",
    author: "Brandon Sanderson",
    publishedDate: new Date("2020-11-17"),
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.STORMLIGHT,
    seriesOrder: 4,
    userData: {
      ownership: { kind: "digital", platform: "Kindle" },
    },
  },

  // -----------------------------------------------------------------------
  // The Expanse (series)
  // -----------------------------------------------------------------------
  {
    id: "leviathan-wakes",
    kind: "series",
    title: "Leviathan Wakes",
    author: "James S.A. Corey",
    publishedDate: new Date("2011-06-02"),
    genreIds: ["genre-sci-fi", "genre-thriller"],
    seriesId: SERIES_IDS.EXPANSE,
    seriesOrder: 1,
    userData: {
      ownership: { kind: "hardcover" },
      readthroughs: [
        {
          finishedAt: new Date("2020-06-18"),
          rating: 4,
          notes: "Great world building. The mystery angle works really well.",
        },
      ],
    },
  },
  {
    id: "caliban-war",
    kind: "series",
    title: "Caliban's War",
    author: "James S.A. Corey",
    publishedDate: new Date("2012-06-26"),
    genreIds: ["genre-sci-fi", "genre-thriller"],
    seriesId: SERIES_IDS.EXPANSE,
    seriesOrder: 2,
    userData: {
      ownership: { kind: "hardcover" },
      readthroughs: [{ finishedAt: new Date("2020-08-04"), rating: 4 }],
    },
  },
  {
    id: "abaddons-gate",
    kind: "series",
    title: "Abaddon's Gate",
    author: "James S.A. Corey",
    publishedDate: new Date("2013-06-04"),
    genreIds: ["genre-sci-fi", "genre-thriller"],
    seriesId: SERIES_IDS.EXPANSE,
    seriesOrder: 3,
    userData: {
      ownership: { kind: "hardcover" },
    },
  },

  // -----------------------------------------------------------------------
  // The Broken Earth (series)
  // -----------------------------------------------------------------------
  {
    id: "fifth-season",
    kind: "series",
    title: "The Fifth Season",
    author: "N.K. Jemisin",
    publishedDate: new Date("2015-08-04"),
    genreIds: ["genre-fantasy", "genre-sci-fi"],
    seriesId: SERIES_IDS.BROKEN_EARTH,
    seriesOrder: 1,
    userData: {
      ownership: { kind: "digital", platform: "Libby" },
      readthroughs: [
        {
          finishedAt: new Date("2023-02-28"),
          rating: 5,
          notes:
            "The second-person narration is jarring at first, then genius.",
        },
      ],
    },
  },
  {
    id: "obelisk-gate",
    kind: "series",
    title: "The Obelisk Gate",
    author: "N.K. Jemisin",
    publishedDate: new Date("2016-08-16"),
    genreIds: ["genre-fantasy", "genre-sci-fi"],
    seriesId: SERIES_IDS.BROKEN_EARTH,
    seriesOrder: 2,
    userData: {
      ownership: { kind: "wishlist" },
    },
  },

  // -----------------------------------------------------------------------
  // Standalone books
  // -----------------------------------------------------------------------
  {
    id: "project-hail-mary",
    kind: "standalone",
    title: "Project Hail Mary",
    author: "Andy Weir",
    publishedDate: new Date("2021-05-04"),
    genreIds: ["genre-sci-fi"],
    userData: {
      ownership: { kind: "digital", platform: "Kindle" },
      readthroughs: [
        {
          finishedAt: new Date("2021-10-12"),
          rating: 5,
          notes: "One of my favorite reading experiences ever.",
        },
      ],
    },
  },
  {
    id: "piranesi",
    kind: "standalone",
    title: "Piranesi",
    author: "Susanna Clarke",
    publishedDate: new Date("2020-09-15"),
    genreIds: ["genre-fantasy", "genre-mystery"],
    userData: {
      ownership: { kind: "hardcover" },
      readthroughs: [{ finishedAt: new Date("2022-01-07"), rating: 5 }],
      notes: "A gift from my sister.",
    },
  },
  {
    id: "gone-girl",
    kind: "standalone",
    title: "Gone Girl",
    author: "Gillian Flynn",
    publishedDate: new Date("2012-06-05"),
    genreIds: ["genre-thriller", "genre-mystery"],
    userData: {
      ownership: { kind: "hardcover" },
      readthroughs: [
        {
          finishedAt: new Date("2019-07-22"),
          rating: 3,
          notes: "Twist was great. Ending was unsatisfying.",
        },
      ],
    },
  },
  {
    id: "lincoln-highway",
    kind: "standalone",
    title: "The Lincoln Highway",
    author: "Amor Towles",
    publishedDate: new Date("2021-10-05"),
    genreIds: ["genre-historical-fiction", "genre-literary-fiction"],
    userData: {
      ownership: { kind: "hardcover" },
      readthroughs: [{ finishedAt: new Date("2023-05-30"), rating: 4 }],
    },
  },
  {
    id: "normal-people",
    kind: "standalone",
    title: "Normal People",
    author: "Sally Rooney",
    publishedDate: new Date("2018-08-30"),
    genreIds: ["genre-literary-fiction", "genre-romance"],
    userData: {
      ownership: { kind: "wishlist" },
    },
  },
  {
    id: "the-shining",
    kind: "standalone",
    title: "The Shining",
    author: "Stephen King",
    publishedDate: new Date("1977-01-28"),
    genreIds: ["genre-horror", "genre-thriller"],
    userData: {
      ownership: { kind: "digital", platform: "Kindle" },
      readthroughs: [
        { finishedAt: new Date("2018-10-30"), rating: 4 },
        {
          finishedAt: new Date("2024-10-25"),
          rating: 5,
          notes: "Appreciated it much more the second time.",
        },
      ],
    },
  },
  {
    id: "sapiens",
    kind: "standalone",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    publishedDate: new Date("2011-01-01"), // Original Hebrew publication year
    genreIds: ["genre-nonfiction", "genre-biography"],
    userData: {
      ownership: { kind: "hardcover" },
      readthroughs: [{ finishedAt: new Date("2020-01-15"), rating: 4 }],
      notes: "Lent to a friend, haven't gotten it back.",
    },
  },
];
