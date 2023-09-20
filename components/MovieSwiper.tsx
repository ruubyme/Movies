import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieSlide from "./MovieSlide";
import { TrendingMovie } from "@/pages";
import { GenreSearchMovieType } from "@/pages";

interface MovieSwiperProps {
  dataList: TrendingMovie[] | GenreSearchMovieType[];
  spaceBetween: number;
  slidesPerView: number;
  showRanking?: boolean;
}
SwiperCore.use([Navigation, Pagination]);

const MovieSwiper: React.FC<MovieSwiperProps> = ({
  dataList,
  spaceBetween,
  slidesPerView,
  showRanking = false,
}) => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div>
      <Swiper
        onSwiper={(swiper) => {
          //console.log("Swiper instance:", swiper);
          swiperRef.current = swiper;
        }}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={true}
        autoplay={false}
        navigation
        scrollbar={{ draggable: true }}
        pagination={{
          dynamicBullets: true,
        }}
      >
        {dataList?.map((item, index) => {
          return (
            <SwiperSlide key={item.id}>
              <MovieSlide
                movie={item}
                index={index}
                showRanking={showRanking}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieSwiper;
