import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Register from "../pages/Register";

const routes=createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Homepage></Homepage>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  }
])

export default routes;