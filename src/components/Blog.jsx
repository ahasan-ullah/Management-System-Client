import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LatestNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("news.json")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <div className="mx-auto px-6">
      <motion.p
        className="text-center text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Latest News
      </motion.p>
      <motion.h2
        className="text-3xl font-bold text-gray-800 text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Latest News & Updates
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{item.date}</p>
              <p className="text-gray-600">{item.excerpt}</p>
              {/* <button className="mt-4 text-blue-600 hover:underline">
                Read More →
              </button> */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
