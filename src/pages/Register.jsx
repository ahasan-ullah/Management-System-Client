import Lottie from "lottie-react";
import registerAnimation from "../assets/animation-file/register-animation.json";
import { Link } from "react-router-dom";

const imageKey = import.meta.env.VITE_IMAGE_KEY;
const imageAPI = `https://api.imgbb.com/1/upload?key=${imageKey}`;

const Register = () => {
  const image
  return (
    <div className="hero min-h-screen mt-16">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center lg:text-left w-80 md:w-[550px]">
          <Lottie animationData={registerAnimation}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-lg shrink-0">
          <h1 className="text-center text-3xl md:text-5xl font-bold mt-5">
            Register now!
          </h1>
          <form className="card-body">
            {/* name field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            {/* email field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            {/* bank account field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bank Account Number</span>
              </label>
              <input
                type="number"
                placeholder="Bank Account Number"
                className="input input-bordered"
                required
              />
            </div>
            {/* salary field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Salary</span>
              </label>
              <input
                type="text"
                placeholder="Salary"
                className="input input-bordered"
                required
              />
            </div>
            {/* designation field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Designation</span>
              </label>
              <input
                type="text"
                placeholder="Designation"
                className="input input-bordered"
                required
              />
            </div>
            {/* photo field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input type="file" className="file-input file-input-bordered" />
            </div>
            {/* pass field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral">Register</button>
            </div>
          </form>
          <div className="card-body -mt-10">
            <p className="text-gray-500 text-sm">
              Already have any account?{" "}
              <Link to={"/login"} className="text-black">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
