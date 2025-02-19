import { useState, useEffect } from "react";

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
      <p className="text-center text-blue-400">Latest News</p>
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Latest News & Updates
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden border"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mb-2">{item.date}</p>
              <p className="text-gray-600">{item.excerpt}</p>
              {/* <button className="mt-4 text-blue-600 hover:underline">
                Read More →
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
