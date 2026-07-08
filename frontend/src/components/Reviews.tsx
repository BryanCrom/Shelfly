import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabaseClient } from "../utils/SupabaseUtil";
import ReviewDescriptionWidget from "./ReviewDescriptionWidget";
import RatingStars from "./RatingStars";

export interface Review {
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

  const { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabaseClient
        .from("reviews")
        .select(
          "id, rating, description, created_at, profiles!user_id(username)",
        )
        .order("created_at", { ascending: false })
        .eq("book_id", id)
        .limit(3);

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
      <h1 className="mb-4 text-center text-3xl font-bold underline">Reviews</h1>
      <ul>
        {reviews.length === 0 ? (
          <div className="my-10 flex justify-center text-xl">
            <h1>There are currently no reviews for this book</h1>
          </div>
        ) : (
          reviews.map((review) => {
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

                    <RatingStars
                      rating={review.rating}
                      className="rating rating-half rating-lg p-2"
                    />

                    {review.description.length > 0 && (
                      <ReviewDescriptionWidget review={review} />
                    )}
                  </div>
                </div>
                <div className="divider" />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Reviews;
