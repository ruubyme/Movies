import Image from "next/image";
import { TrendingMovie, GenreSearchMovie } from "../pages/index";

interface MovieSlideProps {
  movie: TrendingMovie | GenreSearchMovie;
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

      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}?app_key=${process.env.NEXT_PUBLIC_MOVIES_APPKEY}`}
        width={300}
        height={100}
        alt={movie.title}
        priority
      />
      <div>
        <div className="text-white">{movie.title}</div>
        <div className="text-gray-600">{movie.original_title}</div>
      </div>
    </div>
  );
};

export default MovieSlide;
