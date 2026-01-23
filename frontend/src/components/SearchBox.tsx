import Result from "./Result";

import { useState } from "react";

import type { SearchItem } from "../types/SearchTypes";

const SearchBox = () => {
  const [input, setInput] = useState<string>("");
  const [hits, setHits] = useState<SearchItem[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/search?q=${input}`);
    const data = await response.json();
    setHits(data.hits);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto my-10 flex items-center justify-center">
          <input
            className="h-12 min-w-2xl rounded-2xl border-2 border-black p-2"
            type="search"
            autoFocus
            placeholder="Search for books..."
            name="searchBox"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            className="mx-4 h-12 rounded-2xl border-2 p-2 hover:bg-red-600"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      {hits.map((hit) => (
        <Result item={hit} key={hit.objectID} />
      ))}
    </div>
  );
};

export default SearchBox;
