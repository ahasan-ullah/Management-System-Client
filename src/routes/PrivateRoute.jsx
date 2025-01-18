import { useContext } from "react";
import AuthContext from "../provider/AuthContext";
import LoadingPage from '../pages/LoadingPage'
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const {user,loading}=useContext(AuthContext);
  const location=useLocation();

  if(loading){
    return <LoadingPage></LoadingPage>
  }
  if(user){
    return children;
  }
  return <Navigate state={{from: location}} replace to={'/login'}></Navigate>
};

export default PrivateRoute;