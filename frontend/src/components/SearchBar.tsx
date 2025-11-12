import { algoliasearch } from "algoliasearch";
import { InstantSearch, PoweredBy, SearchBox } from "react-instantsearch";

const SearchBar = () => {
  const searchClient = algoliasearch(
    import.meta.env.VITE_ALGOLIA_APPLICATION_ID,
    import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY,
  );

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
            root: "w-40 mx-auto",
            form: "flex items-center bg-white rounded-xl shadow-md border border-gray-200 focus-within:border-blue-500",
            input:
              "flex-1 p-3 text-gray-800 placeholder-gray-400 focus:outline-none",
            reset: "hidden",
            submit: "hidden",
            loadingIndicator: "hidden",
          }}
        >
          <PoweredBy />
        </SearchBox>
      </InstantSearch>
    </div>
  );
};

export default SearchBar;
