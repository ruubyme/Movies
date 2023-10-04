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
  const [sortType, setSortType] = useState<"date" | "ratingHigh" | "ratingLow">(
    "date"
  );

  //정렬기준
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortType) {
      case "date":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "ratingHigh":
        return b.rating - a.rating;
      case "ratingLow":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

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
    return <div className="text-white">Loading...</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-white pt-2">작성된 리뷰가 없습니다.</div>;
  }

  const selectSortTypeClassName = (type: string) => {
    return sortType === type ? "border border-white rounded px-2" : "";
  };

  return (
    <div className="text-white pt-4">
      <div className="mb-4 space-x-4">
        <button
          className={`${selectSortTypeClassName("date")}`}
          onClick={() => setSortType("date")}
        >
          최신순
        </button>
        <button
          className={`${selectSortTypeClassName("ratingHigh")}`}
          onClick={() => setSortType("ratingHigh")}
        >
          별점 높은 순
        </button>
        <button
          className={`${selectSortTypeClassName("ratingLow")}`}
          onClick={() => setSortType("ratingLow")}
        >
          별점 낮은 순
        </button>
      </div>
      <div>
        <ul>
          {sortedReviews.map((review) => (
            <li
              key={review.review_id}
              className="bg-gray-500 bg-opacity-25 rounded p-4 mb-4"
            >
              <Rating value={review.rating} />
              <div>{review.comment}</div>
              <div className="text-xs text-gray-500 pt-2">
                {review.created_at.replace("GMT", "")}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewContent;
