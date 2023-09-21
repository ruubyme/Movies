import { GetServerSidePropsContext } from "next";
import { fetchMovieSearch } from "../api/movie";
import { GenreSearchMovieType as SearchMovieType } from "..";
import MovieSlide from "@/components/MovieSlide";
import React, { useState, useEffect } from "react";
import SearchForm from "@/components/SearchForm";

interface SearchProps {
  keyword: string;
  searchMovies: SearchMovieType[];
  total_pages: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const keyword = context.query.q as string;

  const { responseData, total_pages } = await fetchMovieSearch(keyword, "1");
  const searchMovies: SearchMovieType[] = responseData.map(
    (movie: SearchMovieType) => ({
      id: movie.id,
      poster_path: movie.poster_path,
      original_title: movie.original_title,
      title: movie.title,
    })
  );

  return {
    props: {
      keyword,
      searchMovies,
      total_pages,
    },
  };
}

const SearchInfiniteScroll: React.FC<SearchProps> = ({
  keyword,
  searchMovies,
  total_pages,
}) => {
  const [movies, setMovies] = useState(searchMovies);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleScroll = async () => {
      if (currentPage === Number(total_pages)) {
        return;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        const nextPage = currentPage + 1;
        const newMovies: SearchMovieType[] = (
          await fetchMovieSearch(keyword, nextPage.toString())
        ).responseData;
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
      <div className="text-white">{`"${keyword}" 검색 결과`}</div>
      <SearchForm keyword={keyword} />
      <div className="grid grid-cols-4 gap-2 pt-2">
        {movies.map((movie, i) => {
          return <MovieSlide key={movie.id} movie={movie} index={i} />;
        })}
      </div>
      {currentPage === Number(total_pages) && (
        <div className="text-white">마지막 페이지 입니다.</div>
      )}
    </div>
  );
};

export default SearchInfiniteScroll;
