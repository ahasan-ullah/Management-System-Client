import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from services.json (you can replace with your own file or API)
    fetch("services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <section className="bg-white py-16 my-20">
      <div className="container mx-auto">
        <p className="text-center text-blue-400">Our Services</p>
        <h2 className="text-center text-4xl font-bold mb-8">
          What Services We Provide
        </h2>

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
          className="swiper-container"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <div className="p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <div className="mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-56 object-cover rounded-lg mb-4"
                  />
                </div>
                <div className="text-center">
                  <div className="text-4xl text-primary mb-4">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
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
