import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import type { Review } from "./Reviews";
import useIsOverflowing from "../hooks/useIsOverflowing";

interface ReviewDescriptionProps {
  review: Review;
}

const ReviewDescriptionWidget = (props: ReviewDescriptionProps) => {
  const [openReview, setOpenReview] = useState<boolean>(false);

  const [ref, isOverflowing] =
    useIsOverflowing<HTMLParagraphElement>(openReview);

  return (
    <button
      type="button"
      className={`${(isOverflowing || openReview) && "hover:bg-base-100"} w-full rounded-xl p-2 text-left`}
      onClick={() => setOpenReview((prev) => !prev)}
      disabled={!isOverflowing && !openReview}
    >
      {(isOverflowing || openReview) &&
        (openReview ? <IconChevronUp /> : <IconChevronDown />)}
      <div>
        <p ref={ref} className={openReview ? "break-all" : "truncate"}>
          {props.review.description}
        </p>
      </div>
    </button>
  );
};

export default ReviewDescriptionWidget;
