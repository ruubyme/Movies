import Image from "next/image";
import { MovieInfoType } from "@/pages/movie/[id]";
import react, { useState } from "react";
import noProfileImage from "../public/userImage.svg";
import LikesButton from "./LikesButton";
import { User } from "./useAuthToken";

interface movieInformationTypes {
  movie: MovieInfoType;
  user: User | null;
}

const MovieInformation: React.FC<movieInformationTypes> = ({ movie, user }) => {
  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllCrew, setShowAllCrew] = useState(false);
  const [showAllOverview, setShowAllOverview] = useState(false);

  return (
    <div className="flex flex-wrap max-w-screen-lg mx-auto p-2">
      {/**poster */}
      <div className="w-1/2">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}?app_key=${process.env.NEXT_PUBLIC_MOVIES_APPKEY}`}
          width={200}
          height={100}
          alt={movie.title}
        />
      </div>

      {/**moive title */}
      <div className="w-1/2 pl-2">
        <div className="text-white text-2xl font-bold">{movie.title}</div>
        <div className="text-gray-500 text-xl">{movie.original_title}</div>

        <div className="pb-2">
          {movie.genres.map((genre, i) => (
            <span key={i} className="text-gray-400">
              {genre}
            </span>
          ))}
        </div>

        <div className="text-white">런타임 {movie.runtime}분</div>
        <div className="text-white">개봉날짜 {movie.release_date}</div>
        <div className="text-white">
          제작 국가
          {movie.production_countries.map((country, i) => (
            <div key={i} className="text-gray-400">
              {country}
            </div>
          ))}
        </div>
        <LikesButton movieId={movie.id} user={user} />
      </div>
      <div className="w-full pt-3">
        {/**인물 정보 */}
        <div className="text-white pb-5">
          <h3 className="text-xl font-bold text-white">인물들</h3>
          <div className="flex flex-wrap">
            {(showAllCast
              ? movie.cast.slice(0, 12)
              : movie.cast.slice(0, 4)
            ).map((cast, i) => (
              <div key={i} className="w-1/4 p-2 flex flex-col items-center">
                {cast.profile_path ? (
                  <div className="relative w-12 h-12">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      alt={cast.name}
                    />
                  </div>
                ) : (
                  <Image
                    src={noProfileImage}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="noProfileImage"
                  />
                )}
                <div className="pl-2 text-center">
                  <p className="text-white">{cast.name}</p>
                  <p className="text-sm text-gray-500">{cast.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="text-blue-500"
          onClick={() => setShowAllCast(!showAllCast)}
        >
          {showAllCast ? "숨기기" : "더 보기"}
        </button>

        {/**제작진 정보 */}
        <div className="text-white pb-5">
          <h3 className="text-xl font-bold text-white pt-3">제작진</h3>
          <div className="flex flex-wrap">
            {(showAllCrew
              ? movie.crew.slice(0, 12)
              : movie.crew.slice(0, 4)
            ).map((crew, i) => (
              <div key={i} className="w-1/4 p-2 flex flex-col items-center">
                {crew.profile_path ? (
                  <div className="relative w-12 h-12">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
                      layout="fill"
                      className="rounded-full"
                      objectFit="cover"
                      alt={crew.name}
                    />
                  </div>
                ) : (
                  <Image
                    src={noProfileImage}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="noProfileImage"
                  />
                )}
                <div className="pl-2 text-center">
                  <p className="text-white">{crew.name}</p>
                  <p className="text-sm text-gray-500">{crew.department}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="text-blue-500"
            onClick={() => setShowAllCrew(!showAllCrew)}
          >
            {showAllCrew ? "숨기기" : "더 보기"}
          </button>
        </div>

        <div className="pt-5 bg-gray-500 bg-opacity-25">
          <p className="m-1 text-gray-200 bg-opacity-25">
            {showAllOverview
              ? movie.overview
              : `${movie.overview.slice(0, 30)} ...`}
          </p>
          <button
            className="text-blue-500"
            onClick={() => setShowAllOverview(!showAllOverview)}
          >
            {showAllOverview ? "숨기기" : "더 보기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieInformation;
