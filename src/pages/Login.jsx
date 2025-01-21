import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginAnimation from "../assets/animation-file/login-animation.json";
import axios from "axios";
import AuthContext from "../provider/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {loginUser}=useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
  
    try {
      const response = await axios.get("http://localhost:5000/users", {
        params: { email },
      });
  
      const userData = response.data;
  
      if (!userData) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "User not found",
          text: "No user registered with this email",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
  
      if (userData.isFired) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Access Denied",
          text: "Your account has been disabled. Contact Admin for support.",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        await loginUser(email, password);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data?.message || "Invalid credentials",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  return (
    <>
      <Helmet>
        <title>Login | Management</title>
      </Helmet>
      <div className="hero min-h-screen mt-16">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <div className="text-center lg:text-left w-80 md:w-[550px]">
            <Lottie animationData={loginAnimation}></Lottie>
          </div>
          <div className="card bg-base-100 w-full max-w-lg shrink-0">
            <h1 className="text-center text-3xl md:text-5xl font-bold mt-5">
              Login now!
            </h1>
            <form onSubmit={handleLogin} className="card-body">
              {/* email field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* pass field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-neutral">Login</button>
              </div>
            </form>
            <div className="card-body -mt-10">
              <p className="text-gray-500 text-sm">
                Don't have any account?{" "}
                <Link to={"/register"} className="text-black">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
