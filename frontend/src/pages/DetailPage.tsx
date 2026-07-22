import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DetailText from "../components/DetailText";
import Reviews from "../components/Reviews";
import LeaveReview from "../components/LeaveReview";
import RatingStars from "../components/RatingStars";
import Description from "../components/Description";

import type { SearchItem } from "../types/SearchTypes";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [details, setDetails] = useState<SearchItem | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/get/${id}`);
        const data: SearchItem = await response.json();
        console.log(data);
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
      <div className="mb-5 flex justify-evenly">
        <div>
          <img
            src={details?.coverURL}
            className="mx-auto rounded-lg"
            width="200"
          />
          <RatingStars
            rating={details?.avgRating}
            className="rating rating-half rating-xl m-3 flex scale-125 justify-center"
          />

          <button
            className="btn btn-neutral w-full"
            onClick={() =>
              (
                document.getElementById("review_modal") as HTMLDialogElement
              ).showModal()
            }
          >
            Review
          </button>

          <dialog id="review_modal" className="modal">
            <LeaveReview />
          </dialog>
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

      <div className="mx-10">
        <h1 className="unbderline mb-4 flex justify-center text-center text-3xl font-bold underline">
          Description
        </h1>
        <Description description={details?.description} className="text-2xl" />
      </div>

      <div className="divider divider-neutral mx-10" />

      <Reviews />
    </div>
  );
};

export default DetailPage;
