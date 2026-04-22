import type { AlgoliaHit } from "instantsearch.js";

export interface SearchItem extends AlgoliaHit {
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
}
