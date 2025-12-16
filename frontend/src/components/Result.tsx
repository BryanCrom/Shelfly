import type { SearchItem } from "../types/SearchTypes";

interface ResultProps {
  item: SearchItem;
}

const Result = ({ item }: ResultProps) => {
  return (
    <>
      <div className="px-5">
        <p className="font-semibold">{item.title}</p>
        <p>{item.author}</p>
        <p>{item.isbn10}</p>
        <p>{item.isbn13}</p>
      </div>
    </>
  );
};

export default Result;
