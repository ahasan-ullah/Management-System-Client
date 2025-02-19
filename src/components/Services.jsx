import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
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
    <section className="bg-white py-16 my-20">
      <div className="container mx-auto">
        <motion.p
          className="text-center text-blue-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Our Services
        </motion.p>

        <motion.h2
          className="text-center text-4xl font-bold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          What Services We Provide
        </motion.h2>

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
          {services.map((service, index) => (
            <SwiperSlide key={service.id}>
              <motion.div
                className="p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }} // Staggered Animation
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  transition: { duration: 0.3 }, // Hover scale and rotation
                }}
              >
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
                  <motion.h3
                    className="text-2xl font-semibold mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {service.title}
                  </motion.h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Services;
