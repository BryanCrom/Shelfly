import Search from "../components/Search";

import { PoweredBy } from "react-instantsearch";
const SearchPage = () => {
  return (
    <>
      <Search />
      <PoweredBy
        classNames={{
          root: "mt-10 w-50 mx-auto",
        }}
      />
    </>
  );
};

export default SearchPage;
