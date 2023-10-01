import { flaskAPI } from ".";

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
