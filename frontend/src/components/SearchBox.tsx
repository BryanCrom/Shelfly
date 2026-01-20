import { useState } from "react";

const SearchBox = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(input);
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
    </div>
  );
};

export default SearchBox;
