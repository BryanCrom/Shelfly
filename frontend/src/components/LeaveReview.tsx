import { useRef, type FormEvent } from "react";
import { supabaseClient } from "../utils/SupabaseUtil";
import { useAuth } from "../utils/ZustandUtil";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const LeaveReview = () => {
  const userId = useAuth((state) => state.user?.id);

  const { id } = useParams<{ id: string }>();

  const reviewFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!reviewFormRef.current) {
      return;
    }

    const reviewFormData = new FormData(reviewFormRef.current);

    const { error } = await supabaseClient.from("reviews").insert({
      user_id: userId,
      book_id: id,
      rating: Number(reviewFormData.get("rating")),
      description: reviewFormData.get("description"),
    });

    if (error) {
      console.log("error populating review table: ", error);
    } else {
      toast.success("review sent");
      (document.getElementById("review_modal") as HTMLDialogElement).close();
    }
  };

  return (
    <div className="modal-box">
      <div className="modal-top">
        <h3 className="text-base-content text-center text-xl font-bold">
          Leave a Review
        </h3>
      </div>

      <div className="modal_action">
        <form onSubmit={handleSubmit} ref={reviewFormRef}>
          <label id="rating_input">
            <div className="my-4 w-full">
              <input
                id="rating_input"
                name="rating"
                type="range"
                min={0}
                max={5}
                className="range range-neutral bg-base-300 w-full"
                step={0.5}
              />
              <div className="mx-1.5 flex justify-between px-1.25 text-xs">
                <span>I</span>
                <span>I</span>
                <span>I</span>
                <span>I</span>
                <span>I</span>
                <span>I</span>
                <span>I</span>
                <span>I</span>
                <span>I</span>
                <span>I</span>
                <span>I</span>
              </div>
              <div className="flex justify-between px-1.25 text-xs">
                <span>0.0</span>
                <span>0.5</span>
                <span>1.0</span>
                <span>1.5</span>
                <span>2.0</span>
                <span>2.5</span>
                <span>3.0</span>
                <span>3.5</span>
                <span>4.0</span>
                <span>4.5</span>
                <span>5.0</span>
              </div>
            </div>
          </label>

          <label id="description_input">
            <textarea
              id="description_input"
              name="description"
              className="textarea textarea-neutral w-full resize-none p-4"
              maxLength={500}
              placeholder="leave your thoughts (optional)"
            ></textarea>
          </label>

          <div className="mt-4 flex justify-evenly">
            <button
              type="button"
              onClick={() =>
                (
                  document.getElementById("review_modal") as HTMLDialogElement
                ).close()
              }
              className="btn btn-neutral w-24"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-neutral w-24">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveReview;
