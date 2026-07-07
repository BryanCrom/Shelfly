import { Link } from "react-router-dom";
import type { SearchItem } from "../types/SearchTypes";
import RatingStars from "./RatingStars";

interface ResultProps {
  item: SearchItem;
}

const Result = ({ item }: ResultProps) => {
  return (
    <Link to={`/details/${item.objectID}`}>
      <div className="card card-md bg-base-200 border-base-300 hover:border-primary h-90 w-48 border shadow-md">
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

          <RatingStars rating={item.avgRating} />
        </div>
      </div>
    </Link>
  );
};

export default Result;
