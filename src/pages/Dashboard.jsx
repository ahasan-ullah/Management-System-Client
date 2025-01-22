import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userDB, setUser] = useState([]);

  useEffect(() => {
    if (user.email) {
      axios
        .get("http://localhost:5000/users", {
          params: { email: `${user.email}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user.email]);

  const links = (
    <>
      {userDB.length > 0 && userDB[0].role === "Employee" && (
        <>
          <li className="p-3">
            <NavLink className="btn btn-neutral w-full" to="/dashboard/worksheet">WorkSheet</NavLink>
          </li>
          <li className="p-3">
            <NavLink className="btn btn-neutral w-full" to="/dashboard/payment-history">Payment History</NavLink>
          </li>
        </>
      )}
      {userDB.length > 0 && userDB[0].role === "HR" && (
        <>
          <li className="p-3">
            <NavLink className="btn btn-neutral w-full" to="/dashboard/employee-list">Employee List</NavLink>
          </li>
          <li className="p-3">
            <NavLink className="btn btn-neutral w-full" to="/dashboard/progress">Progress</NavLink>
          </li>
        </>
      )}
      {userDB.length > 0 && userDB[0].role === "Admin" && (
        <>
          <li className="p-3">
            <NavLink className="btn btn-neutral w-full" to="/dashboard/all-employee-list">Employee List</NavLink>
          </li>
          <li className="p-3">
            <NavLink className="btn btn-neutral w-full" to="/dashboard/pay-roll">Payroll</NavLink>
          </li>
          <li className="p-3">
            <NavLink className="btn btn-neutral w-full" to="/dashboard/feedback">Feedback</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <Navbar />
      <div className="md:grid md:grid-cols-12">
        <div className="md:col-span-2 p-3">
          <ul className="flex md:flex-col md:mt-20 justify-center">{links}</ul>
        </div>
        <div className="md:col-span-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
