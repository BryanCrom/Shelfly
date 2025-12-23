import type { SearchItem } from "../types/SearchTypes";

interface ResultProps {
  item: SearchItem;
}

const Result = ({ item }: ResultProps) => {
  return (
    <>
      <div className="px-5">
        <p className="font-semibold">{item.title}</p>
        <p>{item.authors}</p>
      </div>
    </>
  );
};

export default Result;
