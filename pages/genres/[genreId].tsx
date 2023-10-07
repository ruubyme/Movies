import { GetServerSidePropsContext } from "next";
import { SimpleMovieType } from "..";
import { fetchGenresSearch } from "../api/movie";
import MovieSlide from "@/components/MovieSlide";
import React, { useState, useEffect, useRef, useCallback } from "react";

interface GenresInfiniteScrollProps {
  genreMovies: SimpleMovieType[];
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
  const genreMovies: SimpleMovieType[] = allGenreMoviesData.map(
    (movie: SimpleMovieType) => ({
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
  const [currentPage, setCurrentPage] = useState(2);
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
    if (preventRef.current) {
      preventRef.current = false;
      return;
    }
    fetchMoreMovies();
  }, [currentPage]);
  //옵저버 콜백함수
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setCurrentPage((prev) => prev + 1);
    }
  };

  const fetchMoreMovies = useCallback(async () => {
    //로딩시작
    setIsLoading(true);
    try {
      const newMovies = await fetchGenresSearch(
        genreId,
        currentPage.toString()
      );
      if (newMovies.length === 0) {
        endRef.current = true;
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        preventRef.current = true;
      }
    } catch (e) {
      console.error(e);
    } finally {
      //로딩 종료
      setIsLoading(false);
    }
  }, [currentPage]);

  return (
    <div className="p-1">
      <div className="text-white">{`"${genreLabel}" 검색 결과`}</div>
      <div className="grid grid-cols-4 gap-2 pt-2">
        {movies.map((movie, i) => {
          return <MovieSlide key={i} movie={movie} index={i} />;
        })}
      </div>
      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <div ref={observerRef}></div>
    </div>
  );
};

export default GenresInfiniteScroll;
