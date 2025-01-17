import Lottie from "lottie-react";
import registerAnimation from "../assets/animation-file/register-animation.json";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import authContext from "../provider/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const imageKey = import.meta.env.VITE_IMAGE_KEY;
const imageAPI = `https://api.imgbb.com/1/upload?key=${imageKey}`;

const Register = () => {
  //submit method
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(authContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.photo[0] };
    console.log(imageFile);
    const res = await axios.post(imageAPI, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    // createUser(data.email, data.password).then((result) => {
    //   const loggedUser = result.user;
    //   updateUserProfile(data.name, data.photoURL)
    //     .then(() => {
    //       console.log("user profile info updated");
    //       reset();
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "User created successfully.",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       navigate("/");
    //     })
    //     .catch((error) => console.log(error));
    // });
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* name field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
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
                {...register("email", { required: true })}
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
                {...register("bankAcc", { required: true })}
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
                {...register("salary", { required: true })}
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
                {...register("designation", { required: true })}
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
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input file-input-bordered"
              />
            </div>
            {/* pass field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                placeholder="Password"
                className="input input-bordered"
              />
              {/* Error messages */}
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
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
