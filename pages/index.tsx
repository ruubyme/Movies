import Image from "next/image";
import { fetchGenresIdList, fetchTrendingMovies } from "./api/movie";
import Dropdown from "../components/Dropdown";
import { useState } from "react";
import MovieSlide from "@/components/MovieSlide";
import MovieSwiper from "@/components/MovieSwiper";

export interface TrendingMovie {
  id: number;
  poster_path: string;
  original_title: string;
  title: string;
  genre_ids: number[];
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
    value: "0",
    label: "선택 안함",
  });

  const dropdownOptions = genreList.map((genre) => ({
    value: genre.id ? String(genre.id) : "",
    label: genre.name,
  }));
  console.log(dropdownOptions);

  const handleChange = (label: string, value: string) => {
    setSeletedGenre({ value, label });
    console.log(seletedGenre);
  };

  return (
    <>
      <h2 className="text-white p-2">주간 인기 영화 순위</h2>
      <div>
        <MovieSwiper
          dataList={trendMovies}
          spaceBetween={2}
          slidesPerView={3}
        />
        <div className="p-2">
          <div className="text-white">장르</div>
          <div>
            <Dropdown
              name={"genre"}
              value={seletedGenre.value}
              options={dropdownOptions}
              onChange={handleChange}
              className="w-full mt-2 p-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
