import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import type { Hit } from "instantsearch.js";

const Search = () => {
  type MyHit = Hit<{
    title: string;
    poster_path: string;
  }>;

  function Hit({ hit }: { hit: MyHit }) {
    console.log(hit);

    return (
      <>
        <img src={hit.poster_path} />
        <div>{hit.title}</div>
      </>
    );
  }

  return (
    <div className="mt-40">
      <InstantSearch
        searchClient={searchClient}
        indexName={import.meta.env.VITE_INDEX_NAME}
      >
        <SearchBox
          searchAsYouType={true}
          placeholder="Search for books"
          classNames={{
            root: "w-2xl mx-auto",
            form: "flex items-center bg-white rounded-xl shadow-md border border-gray-200 focus-within:border-blue-500",
            input:
              "flex-1 p-3 text-gray-800 placeholder-gray-400 focus:outline-none",
            reset: "hidden",
            submit: "hidden",
            loadingIndicator: "hidden",
          }}
        />
        <Hits<MyHit> hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
};

export default Search;
