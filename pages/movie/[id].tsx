import { GetServerSidePropsContext } from "next";
import { fetchMovieInfoSearch, fetchMovieVedio } from "../api/movie";
import MovieInformation from "@/components/MovieInformation";
import YouTube from "react-youtube";
import { useAuthToken } from "@/components/useAuthToken";

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
  id: string;
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
  movieVedioKey: string;
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
  const movieVedioKey: string = await fetchMovieVedio(movieId);

  return {
    props: {
      movieInfo,
      movieVedioKey,
    },
  };
};

const MovieInfo: React.FC<MovieInfoProps> = ({ movieInfo, movieVedioKey }) => {
  const { user } = useAuthToken();
  const opts = {
    playerVars: {
      autoplay: 1, //자동재생 활성화
      rel: 0, //추천 동영상 비활성화
      controls: 0, //컨트롤 바 비활성화
    },
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="">
          <YouTube videoId={movieVedioKey} opts={opts} />
        </div>
      </div>
      <div
        className="h-screen bg-no-repeat bg-fixed bg-center bg-cover relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieInfo.backdrop_path})`,
        }}
      >
        <div className="absolute bg-black bg-opacity-75 w-full">
          <div>
            <MovieInformation movie={movieInfo} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
