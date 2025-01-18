import { useContext } from "react";
import AuthContext from "../provider/AuthContext";
import Lottie from "lottie-react";
import welcomeFile from "../assets/animation-file/welcome.json";

const DashboardIntro = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div>
        <h3 className="text-3xl">Welcome to {`${user.displayName}'s`} Dashboard</h3>
      </div>
      <div>
        <Lottie animationData={welcomeFile}></Lottie>
      </div>
    </div>
  );
};

export default DashboardIntro;
