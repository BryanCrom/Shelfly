import { PoweredBy } from "react-instantsearch";

import Result from "../components/Result";

import { useState } from "react";

import type { SearchItem } from "../types/SearchTypes";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [input, setInput] = useState<string>("");
  const [hits, setHits] = useState<SearchItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    if (loading) {
      return;
    }

    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`/search?q=${input}`);
      const data = await response.json();
      setHits(data.hits);
    } catch (error) {
      console.log("Error fetching books: " + error);
      toast.error("Something went wrong!", {
        style: {
          borderRadius: "10px",
          background: "#1fb854",
          color: "#1b1717",
        },
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-dvh flex-col items-center">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto mt-44 flex items-center justify-center">
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
          <button
            className="btn btn-primary btn-lg mx-4"
            type="submit"
            disabled={loading}
          >
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
          <>
            <div className="grid grid-cols-5 justify-items-center gap-10">
              {hits &&
                hits.map((hit) => <Result item={hit} key={hit.objectID} />)}
            </div>

            <h1 className="text-primary m-6 text-center font-serif text-6xl">
              {(!hits && "Welcome to Shelfly") ||
                (hits && hits.length === 0 && "No Results")}
            </h1>
            <p className="text-base-content text-center text-lg">
              {(!hits && "Use the Search bar to find your favourite books") ||
                (hits &&
                  hits.length === 0 &&
                  "Use the Search bar to find your favourite books")}
            </p>
          </>
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
