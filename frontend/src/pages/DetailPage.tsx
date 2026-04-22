import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { SearchItem } from "../types/SearchTypes";
import toast from "react-hot-toast";
import DetailText from "../components/DetailText";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [details, setDetails] = useState<SearchItem | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/get/${id}`);
        const data: SearchItem = await response.json();
        setDetails(data);
      } catch (error) {
        console.log("Failed to get details: " + error);
        toast.error("Something went wrong!", {
          style: {
            borderRadius: "10px",
            background: "#1fb854",
            color: "#1b1717",
          },
        });
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className="card bg-base-300 border-neutral m-10 mx-auto max-w-4xl border">
      <h1 className="text-primary my-18 text-center font-serif text-6xl font-bold">
        {details?.title}
      </h1>
      <div className="mb-10 flex justify-center">
        <div className="basis-1/2">
          <img
            src={details?.coverURL}
            className="ml-auto rounded-lg"
            width="400"
          />
          <div className="rating mt-10 mb-5 ml-22 justify-end gap-12">
            <div
              className="mask mask-star bg-base-content scale-250"
              aria-label="1 star"
            />
            <div
              className="mask mask-star bg-base-content scale-250"
              aria-label="2 star"
            />
            <div
              className="mask mask-star bg-base-content scale-250"
              aria-label="3 star"
            />
            <div
              className="mask mask-star bg-base-content scale-250"
              aria-label="4 star"
            />
            <div
              className="mask mask-star bg-base-content scale-250"
              aria-label="5 star"
            />
          </div>
        </div>
        <div className="mx-auto basis-1/2 pl-5">
          <DetailText title="Authors:" content={details?.authors} />
          <DetailText title="Publisher:" content={details?.publisher} />
          <DetailText
            title="Published Date:"
            content={details?.publishedDate}
          />
          <DetailText title="Page Count:" content={details?.pageCount} />
          <DetailText title="Categories:" content={details?.categories} />
          <DetailText title="Language:" content={details?.language} />
          <p className="my-5 mr-5 text-2xl">
            <p className="font-bold underline">Description:</p>{" "}
            {details?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
