import { Autocomplete } from "../components/SearchBox";

import { PoweredBy } from "react-instantsearch";

const SearchPage = () => {
  return (
    <>
      <Autocomplete />
      <PoweredBy
        classNames={{
          root: "my-10 w-50 mx-auto",
        }}
      />
    </>
  );
};

export default SearchPage;
