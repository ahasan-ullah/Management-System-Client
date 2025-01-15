import banner1 from "../assets/Banner/Banner1.jpg";
import banner2 from "../assets/Banner/Banner2.jpg";
import banner3 from "../assets/Banner/Banner3.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <div className="mt-20">
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <img
            className="w-[1200px] h-[400px] object-contain"
            src={banner1}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[1200px] h-[400px] object-contain"
            src={banner3}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-[1200px] h-[400px] object-contain"
            src={banner2}
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
