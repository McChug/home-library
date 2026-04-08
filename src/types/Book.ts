export type Book = StandaloneBook | SeriesBook;

type BaseBook = {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  coverUrl?: string;
  publishedDate?: Date;
  genreIds: string[];
  userData: {
    ownership: UserBookOwnership;
    readthroughs?: Readthrough[];
    notes?: string;
  };
};

type UserBookOwnership =
  | { kind: "unowned" }
  | { kind: "physical" }
  | { kind: "digital"; platform: string };

type StandaloneBook = BaseBook & {
  kind: "standalone";
};

type SeriesBook = BaseBook & {
  kind: "series";
  seriesId: string;
  seriesOrder: number;
};

export type Genre = {
  id: string;
  name: string;
};

type Readthrough = {
  finishedAt: Date;
  rating?: number;
  notes?: string;
};

export type Series = {
  id: string;
  name: string;
};
