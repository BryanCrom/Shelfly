import { SearchBox } from "../components/SearchBox";

import { PoweredBy } from "react-instantsearch";

interface Book {
  title: string;
  [key: string]: unknown;
}

const SearchPage = () => {
  return (
    <>
      <SearchBox<Book>
        openOnFocus={true}
        placeholder="Search book..."
        getSources={() => [
          {
            sourceId: "backend",
            async getItems({ query }) {
              console.log("Query typed:", query);
              const response = await fetch(`/search?q=${query}`);
              const data = await response.json();
              console.log("Data from backend:", data);
              return data.hits;
            },
            templates: {
              item({ item }) {
                return <p>{item.title}</p>;
              },
            },
          },
        ]}
      />
      <PoweredBy
        classNames={{
          root: "my-10 w-50 mx-auto",
        }}
      />
    </>
  );
};

export default SearchPage;
