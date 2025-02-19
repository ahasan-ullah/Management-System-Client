import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("team.json")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.error("Error fetching team data:", err));
  }, []);

  return (
    <section className="mt-20">
      <div className="container mx-auto px-6 text-center">
        <motion.p
          className="text-blue-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Meet Our Team
        </motion.p>
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Our Talented Team Members
        </motion.h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2, // Staggered animation
              }}
            >
              <motion.img
                src={member.image}
                alt={member.name}
                className="w-full h-56 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-3">{member.position}</p>
                <p className="text-gray-500">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
