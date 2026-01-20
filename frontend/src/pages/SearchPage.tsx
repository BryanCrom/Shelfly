import Search from "../components/SearchBox";

import { PoweredBy } from "react-instantsearch";

const SearchPage = () => {
  return (
    <>
      <Search />
      <PoweredBy
        classNames={{
          root: "my-10 w-50 mx-auto",
        }}
      />
    </>
  );
};

export default SearchPage;
