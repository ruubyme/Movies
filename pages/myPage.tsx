import { useAuthToken } from "@/components/useAuthToken";
import { fetchUserLikeAll } from "./api/user";
import { useEffect, useState } from "react";
import { SimpleMovieType } from ".";
import MovieSwiper from "@/components/MovieSwiper";
import { flaskAPI } from "./api";
import { Review } from "@/components/ReviewContent";
import Rating from "@/components/Rating";
import { fetchMovieInfoSearch } from "./api/movie";

interface ReviewListType extends Review {
  title: string;
}

const MyPage: React.FC = () => {
  const { user } = useAuthToken();
  const [likesAllMovies, setLikesAllMovies] = useState<SimpleMovieType[]>([]);
  const [reviewList, setReviewList] = useState<ReviewListType[]>([]);
  const userName = user?.name;

  const fetchLikesAllMovies = async () => {
    if (user) {
      const responseData = await fetchUserLikeAll(user.id);
      if (responseData) {
        setLikesAllMovies(responseData);
      }
    }
  };

  const fetchAllReviews = async () => {
    if (user) {
      try {
        const response = await flaskAPI.get(`/user/reviews?userId=${user.id}`);
        if (response.data.success) {
          const reviewsWithMovieTitle = [];

          for (const review of response.data.data) {
            const movieInfo = await fetchMovieInfoSearch(review.movie_id);
            reviewsWithMovieTitle.push({
              ...review,
              title: movieInfo.title,
            });
          }
          setReviewList(reviewsWithMovieTitle);
        } else {
          console.error("Server Error: ", response.data.message);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  const deleteReview = async (reviewId: number) => {
    try {
      const response = await flaskAPI.delete("/user/reviews", {
        data: {
          reviewId,
          userId: user?.id,
        },
      });
      if (response.data.success) {
        const updatedReviews = reviewList.filter(
          (review) => review.review_id !== reviewId
        );
        setReviewList(updatedReviews);
      } else {
        console.error("Server Error: ", response.data.message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchLikesAllMovies();
    fetchAllReviews();
  }, [user]);

  return (
    <div>
      <div className="text-white p-2">{`${userName}님의 MyPage`}</div>
      <div className="bg-gray-500 bg-opacity-25 p-2 m-2 rounded">
        <div className="text-white py-2">찜한 목록</div>
        {likesAllMovies.length === 0 ? (
          <div className="text-gray-500 text-sm">관심 영화가 없습니다.</div>
        ) : (
          <MovieSwiper
            dataList={likesAllMovies}
            spaceBetween={2}
            slidesPerView={4}
          />
        )}

        <div className="pt-5">
          <div className="text-white py-2">작성한 리뷰</div>
          <ul>
            {reviewList.length === 0 ? (
              <div className="text-gray-500 text-sm">
                작성된 리뷰가 없습니다.
              </div>
            ) : (
              reviewList.map((review) => (
                <li
                  key={review.review_id}
                  className="bg-gray-500 bg-opacity-25 rounded p-4 mb-4"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-white">{review.title}</span>
                    <button
                      onClick={() => deleteReview(review.review_id)}
                      className="bg-red-700 rounded text-white px-2"
                    >
                      X
                    </button>
                  </div>
                  <Rating value={review.rating} />
                  <p className="text-white">{review.comment}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
