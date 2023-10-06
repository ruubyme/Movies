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
  responseData.unshift({ value: "none", name: "선택 안함" });

  return responseData;
};

/**장르 검색 */
export const fetchGenresSearch = async (
  genreId: string,
  page: string = "1"
) => {
  if (genreId === "0") {
    return [];
  }
  const response = await movieAPI.get(
    `/discover/movie?with_genres=${genreId}&api_key=${APP_KEY}&language=ko-KR&page=${page}`
  );
  const responseData = response.data.results;
  return responseData;
};

/**영화 keyword로 검색 */
export const fetchMovieSearch = async (keyword: string, page: string) => {
  const response = await movieAPI.get(
    `/search/movie?api_key=${APP_KEY}&query=${keyword}&language=ko-KR&page=${page}`
  );
  const responseData = response.data.results;
  const total_pages = response.data.total_pages;
  return {
    responseData,
    total_pages,
  };
};

/**영화id로 상세정보 조회*/
export const fetchMovieInfoSearch = async (movieId: string) => {
  const response = await movieAPI.get(
    `/movie/${movieId}?api_key=${APP_KEY}&append_to_response=credits&language=ko-KR`
  );
  const responseData = response.data;
  const movieInfo = {
    id: responseData.id,
    genres: responseData.genres.map((genre: any) => genre.name),
    poster_path: responseData.poster_path,
    overview: responseData.overview,
    original_title: responseData.original_title,
    title: responseData.title,
    adult: responseData.adult,
    runtime: responseData.runtime,
    release_date: responseData.release_date,
    production_countries: responseData.production_countries.map(
      (country: any) => country.name
    ),
    backdrop_path: responseData.backdrop_path,
    cast: responseData.credits.cast.map((cast: any) => {
      const { name, character, profile_path } = cast;
      return { name, character, profile_path };
    }),
    crew: responseData.credits.crew.map((crew: any) => {
      const { name, department, profile_path } = crew;
      return { name, department, profile_path };
    }),
  };
  return movieInfo;
};

/**영화 미리보기 key */
export const fetchMovieVedio = async (movieId: string) => {
  const response = await movieAPI.get(
    `/movie/${movieId}/videos?api_key=${APP_KEY}`
  );
  const responseData = response.data.results;
  const youtubeTrailer = responseData.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer"
  );
  return youtubeTrailer.key;
};
