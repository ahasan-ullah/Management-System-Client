import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/"}></NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact Us</NavLink>
      </li>
    </>
  );
  return(
    <div className="mt-20">
      <Navbar></Navbar>
      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-10">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
