import { GetServerSidePropsContext } from "next";
import { GenreSearchMovieType } from "..";
import { fetchGenresSearch } from "../api/movie";
import MovieSlide from "@/components/MovieSlide";
import React, { useState, useEffect } from "react";

interface GenresInfiniteScrollProps {
  genreMovies: GenreSearchMovieType[];
  genreLabel: string;
  genreId: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //오류 처리
  if (!context.params) {
    return { props: { genreMovies: [], genreLabel: "", genreId: "" } };
  }
  const genreId = context.params.genreId
    ? (context.params.genreId as string)
    : "";
  const genreLabel = context.query.label
    ? (context.query.label as string)
    : null;
  const allGenreMoviesData = await fetchGenresSearch(genreId, "1");
  const genreMovies: GenreSearchMovieType[] = allGenreMoviesData.map(
    (movie: GenreSearchMovieType) => ({
      id: movie.id,
      poster_path: movie.poster_path,
      original_title: movie.original_title,
      title: movie.title,
    })
  );
  return {
    props: {
      genreMovies,
      genreLabel,
      genreId,
    },
  };
}

const GenresInfiniteScroll: React.FC<GenresInfiniteScrollProps> = ({
  genreMovies,
  genreLabel,
  genreId,
}) => {
  const [movies, setMovies] = useState(genreMovies);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        const nextPage = currentPage + 1;
        const newMovies = await fetchGenresSearch(genreId, nextPage.toString());
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setCurrentPage(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  return (
    <div className="p-1">
      <div className="text-white">{`"${genreLabel}" 검색 결과`}</div>
      <div className="grid grid-cols-4 gap-2 pt-2">
        {movies.map((movie, i) => {
          return <MovieSlide key={movie.id} movie={movie} index={i} />;
        })}
      </div>
    </div>
  );
};

export default GenresInfiniteScroll;
