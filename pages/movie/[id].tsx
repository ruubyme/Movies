import { GetServerSidePropsContext } from "next";
import { fetchMovieInfoSearch } from "../api/movie";
import MovieInformation from "@/components/MovieInformation";

interface CastType {
  name: string;
  character: string;
  profile_path: string;
}

interface CrewType {
  name: string;
  department: string;
  profile_path: string;
}

export interface MovieInfoType {
  genres: string[];
  poster_path: string;
  overview: string;
  original_title: string;
  title: string;
  adult: boolean;
  runtime: number;
  release_date: string;
  production_countries: string[];
  backdrop_path: string;
  cast: CastType[];
  crew: CrewType[];
}

interface MovieInfoProps {
  movieInfo: MovieInfoType;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  //오류 처리
  if (!context.params) {
    return { props: { movieInfo: {} } };
  }
  const movieId = context.params.id ? (context.params.id as string) : "";

  const movieInfo: MovieInfoType = await fetchMovieInfoSearch(movieId);

  return {
    props: {
      movieInfo,
    },
  };
};

const MovieInfo: React.FC<MovieInfoProps> = ({ movieInfo }) => {
  return (
    <div
      className="h-screen bg-no-repeat bg-fixed bg-center bg-cover relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieInfo.backdrop_path})`,
      }}
    >
      <div className="absolute bg-black bg-opacity-75 w-full">
        <div>
          <MovieInformation movie={movieInfo} />
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
