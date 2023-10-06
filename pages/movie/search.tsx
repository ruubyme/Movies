import { GetServerSidePropsContext } from "next";
import { fetchMovieSearch } from "../api/movie";
import { SimpleMovieType } from "..";
import MovieSlide from "@/components/MovieSlide";
import React, { useState, useEffect, useCallback, useRef } from "react";
import SearchForm from "@/components/SearchForm";
import Link from "next/link";

interface SearchProps {
  keyword: string;
  searchMovies: SimpleMovieType[];
  total_pages: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const keyword = context.query.q as string;

  const { responseData, total_pages } = await fetchMovieSearch(keyword, "1");
  const searchMovies: SimpleMovieType[] = responseData.map(
    (movie: SimpleMovieType) => ({
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
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const preventRef = useRef(true);
  const endRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (currentPage !== 1) {
      fetchSearchMoreMovies();
    }
  }, [currentPage]);

  //keyword변경 시
  useEffect(() => {
    setMovies(searchMovies);
    setCurrentPage(1);
    endRef.current = false;
    preventRef.current = true;
  }, [keyword]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setCurrentPage((prev) => prev + 1);
    }
  };

  const fetchSearchMoreMovies = useCallback(async () => {
    //로딩시작
    setIsLoading(true);
    try {
      const newMovies = await fetchMovieSearch(keyword, currentPage.toString());
      if (currentPage > newMovies.total_pages) {
        endRef.current = true;
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies.responseData]);
        console.log(movies);
        preventRef.current = true;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  return (
    <div className="p-1">
      <div className="text-white">{`"${keyword}" 검색 결과`}</div>
      <SearchForm keyword={keyword} />
      <div className="grid grid-cols-4 gap-2 pt-2">
        {movies.map((movie, i) => {
          return (
            <Link href={`/movie/${movie.id}`} key={i}>
              <MovieSlide movie={movie} index={i} />;
            </Link>
          );
        })}
      </div>
      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
      {currentPage > Number(total_pages) && (
        <div className="text-white pt-2">마지막 페이지 입니다.</div>
      )}
      <div ref={observerRef}></div>
    </div>
  );
};

export default SearchInfiniteScroll;
