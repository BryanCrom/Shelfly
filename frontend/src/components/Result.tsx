import type { SearchItem } from "../types/SearchTypes";

interface ResultProps {
  item: SearchItem;
}

const Result = ({ item }: ResultProps) => {
  return (
    <div className="card card-md bg-base-200 border-base-300 h-90 w-48 border shadow-md">
      <div className="card-body flex w-full">
        <figure className="h-50 overflow-hidden">
          <img src={item.coverURL} className="rounded-lg" />
        </figure>

        <h1 className="text-base-content w-full truncate text-center text-lg font-bold">
          {item.title}
        </h1>
        <div className="h-10">
          <p className="text-base-content w-full truncate text-center">
            {item.authors}
          </p>
        </div>

        <div className="rating flex items-center justify-center">
          <div className="mask mask-star bg-base-content" aria-label="1 star" />
          <div className="mask mask-star bg-base-content" aria-label="2 star" />
          <div className="mask mask-star bg-base-content" aria-label="3 star" />
          <div className="mask mask-star bg-base-content" aria-label="4 star" />
          <div className="mask mask-star bg-base-content" aria-label="5 star" />
        </div>
      </div>
    </div>
  );
};

export default Result;
