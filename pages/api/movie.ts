import { movieAPI } from ".";

const APP_KEY = process.env.NEXT_PUBLIC_MOVIES_APPKEY;

/**주간 인기 영화 순위 */
export const fetchTrendingMovies = async () => {
  const response = await movieAPI.get(
    `/trending/movie/week?api_key=${APP_KEY}&language=ko-KR&page=1`
  );
  const responseData = response.data.results;
  return responseData;
};

/**장르 얻어오기 */
export const fetchGenresIdList = async () => {
  const response = await movieAPI.get(
    `/genre/movie/list?api_key=${APP_KEY}&language=ko-KR`
  );
  const responseData = response.data["genres"];
  responseData.unshift({ value: "", name: "선택 안함" });

  return responseData;
};
