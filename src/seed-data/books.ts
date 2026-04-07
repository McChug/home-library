import type { Book } from "../types/Book";
import { SERIES_IDS } from "./series";

export const books: Book[] = [
  // -----------------------------------------------------------------------
  // The Lord of the Rings (series)
  // -----------------------------------------------------------------------
  {
    id: "book-fellowship",
    kind: "series",
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    coverUrl:
      "https://m.media-amazon.com/images/I/71Ep7UNeTtL._AC_UF1000,1000_QL80_.jpg",
    publishedYear: 1954,
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.LOTR,
    seriesOrder: 1,
    userData: {
      ownership: { kind: "physical" },
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
    id: "book-two-towers",
    kind: "series",
    title: "The Two Towers",
    author: "J.R.R. Tolkien",
    publishedYear: 1954,
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.LOTR,
    seriesOrder: 2,
    userData: {
      ownership: { kind: "physical" },
      readthroughs: [{ finishedAt: new Date("2021-04-02"), rating: 5 }],
    },
  },
  {
    id: "book-return-of-the-king",
    kind: "series",
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    publishedYear: 1955,
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.LOTR,
    seriesOrder: 3,
    userData: {
      ownership: { kind: "physical" },
      readthroughs: [{ finishedAt: new Date("2021-04-20"), rating: 5 }],
    },
  },

  // -----------------------------------------------------------------------
  // The Stormlight Archive (series)
  // -----------------------------------------------------------------------
  {
    id: "book-way-of-kings",
    kind: "series",
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    publishedYear: 2010,
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
    id: "book-words-of-radiance",
    kind: "series",
    title: "Words of Radiance",
    author: "Brandon Sanderson",
    publishedYear: 2014,
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.STORMLIGHT,
    seriesOrder: 2,
    userData: {
      ownership: { kind: "digital", platform: "Kindle" },
      readthroughs: [{ finishedAt: new Date("2022-09-15"), rating: 5 }],
    },
  },
  {
    id: "book-oathbringer",
    kind: "series",
    title: "Oathbringer",
    author: "Brandon Sanderson",
    publishedYear: 2017,
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.STORMLIGHT,
    seriesOrder: 3,
    userData: {
      ownership: { kind: "digital", platform: "Kindle" },
      readthroughs: [{ finishedAt: new Date("2022-11-03"), rating: 4 }],
    },
  },
  {
    id: "book-rhythm-of-war",
    kind: "series",
    title: "Rhythm of War",
    author: "Brandon Sanderson",
    publishedYear: 2020,
    genreIds: ["genre-fantasy"],
    seriesId: SERIES_IDS.STORMLIGHT,
    seriesOrder: 4,
    userData: {
      ownership: { kind: "digital", platform: "Kindle" },
      // Currently reading / not yet finished — no readthroughs
    },
  },

  // -----------------------------------------------------------------------
  // The Expanse (series)
  // -----------------------------------------------------------------------
  {
    id: "book-leviathan-wakes",
    kind: "series",
    title: "Leviathan Wakes",
    author: "James S.A. Corey",
    publishedYear: 2011,
    genreIds: ["genre-sci-fi", "genre-thriller"],
    seriesId: SERIES_IDS.EXPANSE,
    seriesOrder: 1,
    userData: {
      ownership: { kind: "physical" },
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
    id: "book-caliban-war",
    kind: "series",
    title: "Caliban's War",
    author: "James S.A. Corey",
    publishedYear: 2012,
    genreIds: ["genre-sci-fi", "genre-thriller"],
    seriesId: SERIES_IDS.EXPANSE,
    seriesOrder: 2,
    userData: {
      ownership: { kind: "physical" },
      readthroughs: [{ finishedAt: new Date("2020-08-04"), rating: 4 }],
    },
  },
  {
    id: "book-abaddons-gate",
    kind: "series",
    title: "Abaddon's Gate",
    author: "James S.A. Corey",
    publishedYear: 2013,
    genreIds: ["genre-sci-fi", "genre-thriller"],
    seriesId: SERIES_IDS.EXPANSE,
    seriesOrder: 3,
    userData: {
      // Owned but not yet read
      ownership: { kind: "physical" },
    },
  },

  // -----------------------------------------------------------------------
  // The Broken Earth (series)
  // -----------------------------------------------------------------------
  {
    id: "book-fifth-season",
    kind: "series",
    title: "The Fifth Season",
    author: "N.K. Jemisin",
    publishedYear: 2015,
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
    id: "book-obelisk-gate",
    kind: "series",
    title: "The Obelisk Gate",
    author: "N.K. Jemisin",
    publishedYear: 2016,
    genreIds: ["genre-fantasy", "genre-sci-fi"],
    seriesId: SERIES_IDS.BROKEN_EARTH,
    seriesOrder: 2,
    userData: {
      // On the list but not yet owned
      ownership: { kind: "unowned" },
    },
  },

  // -----------------------------------------------------------------------
  // Standalone books
  // -----------------------------------------------------------------------
  {
    id: "book-project-hail-mary",
    kind: "standalone",
    title: "Project Hail Mary",
    author: "Andy Weir",
    publishedYear: 2021,
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
    id: "book-piranesi",
    kind: "standalone",
    title: "Piranesi",
    author: "Susanna Clarke",
    publishedYear: 2020,
    genreIds: ["genre-fantasy", "genre-mystery"],
    userData: {
      ownership: { kind: "physical" },
      readthroughs: [{ finishedAt: new Date("2022-01-07"), rating: 5 }],
      notes: "A gift from my sister.",
    },
  },
  {
    id: "book-gone-girl",
    kind: "standalone",
    title: "Gone Girl",
    author: "Gillian Flynn",
    publishedYear: 2012,
    genreIds: ["genre-thriller", "genre-mystery"],
    userData: {
      ownership: { kind: "physical" },
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
    id: "book-lincoln-highway",
    kind: "standalone",
    title: "The Lincoln Highway",
    author: "Amor Towles",
    publishedYear: 2021,
    genreIds: ["genre-historical-fiction", "genre-literary-fiction"],
    userData: {
      ownership: { kind: "physical" },
      readthroughs: [{ finishedAt: new Date("2023-05-30"), rating: 4 }],
    },
  },
  {
    id: "book-normal-people",
    kind: "standalone",
    title: "Normal People",
    author: "Sally Rooney",
    publishedYear: 2018,
    genreIds: ["genre-literary-fiction", "genre-romance"],
    userData: {
      // Unowned, on the wishlist
      ownership: { kind: "unowned" },
    },
  },
  {
    id: "book-the-shining",
    kind: "standalone",
    title: "The Shining",
    author: "Stephen King",
    publishedYear: 1977,
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
    id: "book-sapiens",
    kind: "standalone",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    publishedYear: 2011,
    genreIds: ["genre-nonfiction", "genre-biography"],
    userData: {
      ownership: { kind: "physical" },
      readthroughs: [{ finishedAt: new Date("2020-01-15"), rating: 4 }],
      notes: "Lent to a friend, haven't gotten it back.",
    },
  },
];
