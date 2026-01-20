import type { AlgoliaHit } from "instantsearch.js";

export type SearchItem = AlgoliaHit<{
  objectID: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  isbn10: string;
  isbn13: string;
  page_count: string;
  categories: string[];
  coverURL: string;
  language: string;
}>;
