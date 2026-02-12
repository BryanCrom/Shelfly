import { PoweredBy } from "react-instantsearch";

import Result from "../components/Result";

import { useState } from "react";

import type { SearchItem } from "../types/SearchTypes";

const SearchPage = () => {
  const [input, setInput] = useState<string>("");
  const [hits, setHits] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(`/search?q=${input}`);
    const data = await response.json();
    setHits(data.hits);

    setLoading(false);
  };

  return (
    <div className="flex min-h-dvh flex-col items-center">
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
      <div className="flex-1 content-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-xl" />
          </div>
        ) : (
          <div className="grid grid-cols-5 justify-items-center gap-10">
            {hits.map((hit) => (
              <Result item={hit} key={hit.objectID} />
            ))}
          </div>
        )}
      </div>
      <PoweredBy
        theme={"dark"}
        classNames={{
          root: "w-50 my-10 mx-auto",
        }}
      />
    </div>
  );
};

export default SearchPage;
