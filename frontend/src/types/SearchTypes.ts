import type { AlgoliaHit } from "instantsearch.js";

export type SearchItem = AlgoliaHit<{
  objectID: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: string;
  categories: string[];
  coverURL: string;
  language: string;
}>;
