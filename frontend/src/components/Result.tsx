import type { SearchItem } from "../types/SearchTypes";

interface ResultProps {
  item: SearchItem;
}

const Result = ({ item }: ResultProps) => {
  return (
    <>
      <div className="p-5">
        <p className="font-semibold">{item.title}</p>
        <p>{item.authors}</p>
        <img src={item.coverURL} />
      </div>
    </>
  );
};

export default Result;
