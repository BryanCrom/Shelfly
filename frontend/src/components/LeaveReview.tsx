const LeaveReview = () => {
  return (
    <div className="modal-box">
      <div className="modal-top">
        <h3 className="text-base-content mb-6 text-center text-xl font-bold">
          Leave a Review
        </h3>
      </div>

      <textarea
        className="textarea textarea-neutral w-full resize-none p-4"
        maxLength={500}
      ></textarea>
      <div className="modal-action justify-evenly">
        <label htmlFor="review_modal" className="btn btn-neutral w-24">
          Cancel
        </label>
        <label htmlFor="review_modal" className="btn btn-neutral w-24">
          Send
        </label>
      </div>
    </div>
  );
};

export default LeaveReview;
