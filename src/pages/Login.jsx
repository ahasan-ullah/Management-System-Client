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
  const { loginUser, googleLogin } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await axios.get("https://management-system-server-9y2z6ohsz-ahasan-ullahs-projects.vercel.app/users", {
        params: { email },
      });

      const userData = response.data;

      if (!userData) {
        Swal.fire({
          title: "Not Found!",
          text: "Users not found",
          icon: "error",
        });
        return;
      }

      if (userData[0].isFired) {
        Swal.fire({
          title: "Access Denied",
          text: "Your account has been disabled. Contact Admin for support.",
          icon: "error",
        });
      } else {
        await loginUser(email, password);
        Swal.fire({
          title: "Welcome",
          text: "Login Successful",
          icon: "success",
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: "Invalid credentials",
        icon: "error",
      });
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          role: "Employee",
          bankAcc: "",
          salary: "",
          designation: "",
          photo: user.photoURL,
        };

        // adding user data to database
        axios
          .post("https://management-system-server-9y2z6ohsz-ahasan-ullahs-projects.vercel.app/users", userData)
          .then((res) => {})
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Email Already Exists",
              icon: "error",
            });
          });
        navigate("/");
        Swal.fire({
          title: "Welcome",
          text: "Login Successful",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          icon: "error",
          title: "Login Unsuccessful",
        });
      });
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
              <div className="form-control">
                <button onClick={handleGoogleLogin} className="btn btn-neutral">
                  Login with google
                </button>
              </div>
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
