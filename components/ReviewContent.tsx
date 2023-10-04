import { flaskAPI } from "@/pages/api";
import axios from "axios";
import { useEffect, useState } from "react";
import Rating from "./Rating";

interface ReviewContentProps {
  movieId: string;
}

interface Review {
  review_id: number;
  movie_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

const ReviewContent: React.FC<ReviewContentProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovieReviews = async () => {
    try {
      const response = await flaskAPI.get(`/movie/reviews?movieId=${movieId}`);
      if (response.data.success) {
        setReviews(response.data.data);
      } else {
        console.error("ServerError: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieReviews();
    console.log(reviews);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-white pt-2">작성된 리뷰가 없습니다.</div>;
  }

  return (
    <div className="text-white pt-4">
      <div>
        <ul>
          {reviews.map((review) => (
            <li
              key={review.review_id}
              className="bg-gray-500 bg-opacity-25 rounded p-4 mb-4"
            >
              <Rating value={review.rating} />
              <div>{review.comment}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewContent;
