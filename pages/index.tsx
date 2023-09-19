import {
  fetchGenresIdList,
  fetchGenresSearch,
  fetchTrendingMovies,
} from "./api/movie";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import MovieSwiper from "@/components/MovieSwiper";

export interface TrendingMovie {
  id: number;
  poster_path: string;
  original_title: string;
  title: string;
  genre_ids: number[];
}
export interface GenreSearchMovie {
  id: number;
  poster_path: string;
  original_title: string;
  title: string;
}

interface HomeProps {
  trendMovies: TrendingMovie[];
  genreList: Genres[];
}

interface Genres {
  id: number;
  name: string;
}

export const getServerSideProps = async () => {
  const allTrendMoviesData = await fetchTrendingMovies();
  const trendMovies: TrendingMovie[] = allTrendMoviesData.map(
    (movie: TrendingMovie) => ({
      id: movie.id,
      poster_path: movie.poster_path,
      original_title: movie.original_title,
      title: movie.title,
      genre_ids: movie.genre_ids,
    })
  );

  const genreList: Genres[] = await fetchGenresIdList();

  return {
    props: { trendMovies, genreList },
  };
};

const Home: React.FC<HomeProps> = ({ trendMovies, genreList }) => {
  const [seletedGenre, setSeletedGenre] = useState({
    value: "none",
    label: "선택 안함",
  });
  const [genreSearchMovies, setGenreSearchMovies] = useState<
    GenreSearchMovie[]
  >([]);

  const dropdownOptions = genreList.map((genre) => ({
    value: genre.id ? String(genre.id) : "none",
    label: genre.name,
  }));
  console.log(dropdownOptions);

  const handleChange = (label: string, value: string) => {
    setSeletedGenre({ value, label });
    console.log(seletedGenre);
  };

  const handleChangeGenre = async () => {
    const allGenreSearchMovies = await fetchGenresSearch(seletedGenre.value);
    const nextGenreSearchMovies: GenreSearchMovie[] = allGenreSearchMovies.map(
      (movie: GenreSearchMovie) => ({
        id: movie.id,
        poster_path: movie.poster_path,
        original_title: movie.original_title,
        title: movie.title,
      })
    );
    setGenreSearchMovies(nextGenreSearchMovies);
  };

  useEffect(() => {
    handleChangeGenre();
    console.log(seletedGenre);
  }, [seletedGenre]);

  return (
    <>
      <h2 className="text-white p-2">주간 인기 영화 순위</h2>
      <div>
        <MovieSwiper
          dataList={trendMovies}
          spaceBetween={2}
          slidesPerView={3}
          showRanking={true}
        />
        <div className="p-2">
          <div className="text-white">장르</div>
          <div className="relative z-50">
            <Dropdown
              name={"genre"}
              value={seletedGenre.value}
              options={dropdownOptions}
              onChange={handleChange}
              className="w-full mt-2 p-2"
            />
          </div>
          {seletedGenre.value !== "none" && (
            <div className="pt-2">
              <MovieSwiper
                dataList={genreSearchMovies}
                spaceBetween={2}
                slidesPerView={3}
              />
              <div className="text-gray-400">더 보기</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
