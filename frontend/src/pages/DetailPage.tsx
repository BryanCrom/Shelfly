import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { SearchItem } from "../types/SearchTypes";
import toast from "react-hot-toast";
import DetailText from "../components/DetailText";
import Reviews from "../components/Reviews";

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
    <div className="card bg-base-300 border-neutral m-10 mx-auto mt-48 max-w-4xl border">
      <h1 className="text-base-content my-18 text-center text-6xl font-bold">
        {details?.title}
      </h1>
      <div className="mb-10 flex justify-evenly">
        <div>
          <img
            src={details?.coverURL}
            className="mx-auto rounded-lg"
            width="200"
          />
          <div className="rating my-5 flex justify-center gap-4">
            <div
              className="mask mask-star bg-base-content scale-150"
              aria-label="1 star"
            />
            <div
              className="mask mask-star bg-base-content scale-150"
              aria-label="2 star"
            />
            <div
              className="mask mask-star bg-base-content scale-150"
              aria-label="3 star"
            />
            <div
              className="mask mask-star bg-base-content scale-150"
              aria-label="4 star"
            />
            <div
              className="mask mask-star bg-base-content scale-150"
              aria-label="5 star"
            />
          </div>
        </div>

        <div>
          <DetailText title="Authors:" content={details?.authors} />
          <DetailText title="Publisher:" content={details?.publisher} />
          <DetailText
            title="Published Date:"
            content={details?.publishedDate}
          />
          <DetailText title="Page Count:" content={details?.pageCount} />
          <DetailText title="Categories:" content={details?.categories} />
          <DetailText title="Language:" content={details?.language} />
        </div>
      </div>
      <div className="divider divider-neutral mx-10" />
      <p className="mx-10 text-2xl">
        <p className="font-bold underline">Description:</p>{" "}
        {details?.description}
      </p>

      <Reviews />
    </div>
  );
};

export default DetailPage;
