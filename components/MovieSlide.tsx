import Image from "next/image";
import noPoster from "../public/noImage.svg";
import { TrendingMovie, SearchMovieType } from "../pages/index";
import Link from "next/link";

interface MovieSlideProps {
  movie: TrendingMovie | SearchMovieType;
  index: number;
  showRanking?: boolean;
}

const MovieSlide: React.FC<MovieSlideProps> = ({
  movie,
  index,
  showRanking = false,
}) => {
  return (
    <div>
      {showRanking && index !== undefined && (
        <div className="absolute top-1 left-1 bg-yellow-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center">
          <span>{index + 1}</span>
        </div>
      )}

      {movie.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}?app_key=${process.env.NEXT_PUBLIC_MOVIES_APPKEY}`}
          width={300}
          height={100}
          alt={movie.title}
          priority
        />
      ) : (
        <Image src={noPoster} width={300} height={100} alt="No Image" />
      )}
      <div>
        <div className="text-white">{movie.title}</div>
        <div className="text-gray-600 text-sm">{movie.original_title}</div>
      </div>
    </div>
  );
};

export default MovieSlide;
