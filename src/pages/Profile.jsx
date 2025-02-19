import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaUserTie, FaMoneyBillWave, FaIdBadge, FaUniversity } from "react-icons/fa";
import AuthContext from "../provider/AuthContext";
import LoadingPage from "./LoadingPage";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [loggedUser, setUser] = useState(null);
  const [loading,setLoading]=useState(true);

  

  useEffect(() => {
    fetch(`https://management-system-server-amber.vercel.app/users?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  if(loading){
    return <LoadingPage></LoadingPage>
  }

  return (
    <div className="flex justify-center items-start mt-10 min-h-screen px-6">
      <motion.div
        className="bg-white p-8 rounded-2xl max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={loggedUser[0].photo}
          alt="User Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 shadow-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">{loggedUser[0].name}</h2>
        <p className="text-gray-600 text-sm">{loggedUser[0].designation}</p>

        <div className="mt-6 space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-blue-500" />
            <p className="text-gray-700">Email: {loggedUser[0].email}</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaUserTie className="text-green-500" />
            <p className="text-gray-700">Role: {loggedUser[0].role}</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaMoneyBillWave className="text-yellow-500" />
            <p className="text-gray-700">Salary: {loggedUser[0].salary}</p>
          </div>
          <div className="flex items-center space-x-3">
            <FaIdBadge className="text-red-500" />
            <p className="text-gray-700">Bank Acc: {loggedUser[0].bankAcc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
