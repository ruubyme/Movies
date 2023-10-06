import { flaskAPI } from ".";
import { SimpleMovieType } from "..";
import { fetchMovieInfoSearch } from "./movie";

/**user의 특정 영화 좋아요 여부  */
export const fetchUserLikeStatus = async (movieId: string, userId: string) => {
  try {
    const response = await flaskAPI.get(
      `/user/likes?movieId=${movieId}&userId=${userId}`
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      console.error("Server Error: ", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

/**user가 좋아요한 영화 리스트 조회 */
export const fetchUserLikeAll = async (userId: number) => {
  try {
    const response = await flaskAPI.get(`/user/likes/all?userId=${userId}`);
    if (response.data.success) {
      const movieIds: string[] = response.data.data;

      const promises = movieIds.map((movieId) => {
        return fetchMovieInfoSearch(movieId);
      });

      const responseData = await Promise.all(promises);
      const likesAllMovies: SimpleMovieType[] = responseData.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        original_title: movie.original_title,
      }));
      return likesAllMovies;
    } else {
      console.error("Server Error: ", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};
