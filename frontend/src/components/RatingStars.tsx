type RatingStarsProp = {
  rating?: number;
};

const RatingStars = ({ rating }: RatingStarsProp) => {
  const stars = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

  return (
    <>
      <div className="rating rating-half rating-lg p-2">
        {stars.map((star) => (
          <div
            key={star}
            className={`mask mask-star bg-base-content ${star % 1 === 0.5 ? "mask-half-1" : "mask-half-2"}`}
            aria-label={`${star} star`}
            aria-checked={star === rating}
          />
        ))}
      </div>
    </>
  );
};

export default RatingStars;
