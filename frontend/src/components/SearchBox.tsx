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
            className="input input-primary input-lg min-w-2xl"
            type="search"
            autoFocus
            placeholder="Search for books..."
            name="searchBox"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button className="btn btn-primary btn-lg mx-4" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="mx-4 grid grid-cols-5 gap-10 shadow-sm">
        {hits.map((hit) => (
          <Result item={hit} key={hit.objectID} />
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
