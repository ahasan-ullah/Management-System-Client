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
  const { createUser, updateUser, googleLogin } =
    useContext(authContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(imageAPI, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const image = res.data.data.display_url;
    const name = data.name;
    const userData = {
      name: name,
      email: data.email,
      role: data.role,
      bankAcc: data.bankAcc,
      salary: data.salary,
      designation: data.designation,
      photo: image,
    };

    // adding user data to database
    axios
      .post("https://management-system-server-amber.vercel.app/users", userData)
      .then((res) => {})
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Email Already Exists",
          icon: "error",
        });
      });

    //firebase authentications
    createUser(data.email, data.password)
      .then((result) => {
        updateUser(name, image)
          .then(() => {
            reset();
            Swal.fire({
              title: "Welcome",
              text: "Registration Successfull",
              icon: "success",
            });
            navigate("/");
          })
          .catch((error) =>{});
      })
      .catch((err) => {});
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user=result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          role: "Employee",
          bankAcc: '',
          salary: '',
          designation: '',
          photo: user.photoURL
        };
    
        // adding user data to database
        axios
          .post("https://management-system-server-amber.vercel.app/users", userData)
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
          title: 'Welcome',
          text: "Registration Successful",
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error',
          icon: "error",
          text: "Registration Unsuccessful",
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Register | Management System</title>
      </Helmet>
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
              {/* role field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  {...register("role", { required: true })}
                  className="select select-bordered"
                  defaultValue={"Select Role"}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Employee">Employee</option>
                  <option value="HR">HR</option>
                </select>
                {errors.role && (
                  <p className="text-red-600">Role is required</p>
                )}
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
                  type="number"
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
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-neutral">Register</button>
              </div>
            </form>
            <div className="card-body -mt-10">
              <div className="form-control">
                <button onClick={handleGoogleLogin} className="btn btn-neutral">
                  Register with google
                </button>
              </div>
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
    </>
  );
};

export default Register;
