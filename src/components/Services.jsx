import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <section className="bg-base-100 py-16 my-20">
      <div className="container mx-auto">
      <p className="text-center text-blue-400">Services</p>
      <h2 className="text-center text-4xl font-bold">What Services We Provide</h2>

        {/* Swiper Component */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="swiper-container h-56"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id} className="p-4">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body text-center">
                  <div className="text-5xl text-primary mb-4">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600 mt-3">{service.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Services;
