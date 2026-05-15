import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabaseClient } from "../utils/SupabaseUtil";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

interface Review {
  id: number;
  rating: number;
  description: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openReviews, setOpenReviews] = useState<Set<number>>(new Set());

  const { id } = useParams();

  const stars = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

  const toggleReview = (id: number) => {
    setOpenReviews((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabaseClient
        .from("reviews")
        .select(
          "id, rating, description, created_at, profiles!user_id(username)",
        )
        .eq("book_id", id);

      if (error) {
        console.log("error fetching reviews:", error);
      } else if (data) {
        const reviewData = data.map((review) => ({
          ...review,
          profiles: Array.isArray(review.profiles)
            ? review.profiles[0]
            : review.profiles,
        }));

        setReviews(reviewData as Review[]);
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div>
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.id} className="mx-10">
              <div className="text-lg">
                <div>
                  <p className="flex justify-between px-2 underline">
                    {review.profiles.username}
                    <span>
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </p>

                  <div className="rating rating-half rating-lg p-2">
                    {stars.map((star) => (
                      <div
                        key={star}
                        className={`mask mask-star bg-primary ${star % 1 === 0.5 ? "mask-half-1" : "mask-half-2"}`}
                        aria-label={`${star} star`}
                        aria-checked={star === review.rating}
                      />
                    ))}
                  </div>

                  {review.description.length > 0 && (
                    <button
                      type="button"
                      className="hover:bg-base-100 w-full rounded-xl p-2 text-left"
                      onClick={() => toggleReview(review.id)}
                    >
                      {openReviews.has(review.id) ? (
                        <>
                          <IconChevronDown />
                          <p className="truncate">{review.description}</p>
                        </>
                      ) : (
                        <>
                          <IconChevronUp />
                          <p className="break-all">{review.description}</p>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="divider" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
