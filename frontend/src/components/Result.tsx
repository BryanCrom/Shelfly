import type { SearchItem } from "../types/SearchTypes";

interface ResultProps {
  item: SearchItem;
}

const Result = ({ item }: ResultProps) => {
  return <div>{item.title}</div>;
};

export default Result;
