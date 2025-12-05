import type { SearchItem } from "../types/SearchTypes";

interface ResultProps {
  item: SearchItem;
}

const Result = ({ item }: ResultProps) => {
  return (
    <>
      <img src={item.poster_path} className="" />
      <div className="px-5">
        <p className="font-semibold">{item.title}</p>
        <p>{item.overview}</p>
      </div>
    </>
  );
};

export default Result;
