import { Link } from "react-router-dom";
import errorImage from "../assets/Error.jpg"

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-5">
      {/* <h1 className="text-7xl font-bold">Oops!</h1> */}
      <div className="flex items-center justify-center">
        <img className="w-96" src={errorImage} alt="" />
      </div>
      <p className="text-3xl">404-Page not found</p>
      <Link to={'/'} className="btn md:btn-lg btn-neutral text-2xl">Back To Home</Link>
    </div>
  );
};

export default ErrorPage;