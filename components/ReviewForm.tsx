import axios from "axios";
import { User } from "./useAuthToken";
import { useState } from "react";
import { flaskAPI } from "@/pages/api";
import Rating from "./Rating";

interface ReviewFormProps {
  movieId: string;
  user: User;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId, user }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await flaskAPI.post("/user/reviews", {
        movieId,
        userId: user.id,
        rating,
        comment: content,
      });

      if (response.data.success) {
        alert(`${response.data.message}`);
      } else {
        console.log("Server Error: ", response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleReviewSubmit}>
      <div className="bg-gray-500 bg-opacity-25 rounded p-4 mb-2">
        <div onClick={() => setRating(0)} className="pb-2">
          <Rating value={rating} onSelect={setRating} />
        </div>
        <textarea
          name="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-3/4 p-2 rounded mb-2 bg-gray-500 bg-opacity-30 text-white"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white py-1 px-4 rounded w-1/5"
      >
        OK
      </button>
    </form>
  );
};

export default ReviewForm;
