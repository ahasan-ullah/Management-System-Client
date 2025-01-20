import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../provider/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogin = () => {
    logout().then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout Successfull",
        showConfirmButton: false,
        timer: 1500,
      });
    }).catch((error) => console.log(error));
  };
  const links = (
    <>
    <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/dashboard'}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={'/contact'}>Contact Us</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 fixed top-0 border-b-2 max-w-7xl z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Manage Us</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <button onClick={handleLogin}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-x-3">
            <Link
              to={"/login"}
              className="btn btn-active btn-neutral hover:bg-transparent hover:text-black"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="btn btn-active btn-neutral hover:bg-transparent hover:text-black"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
