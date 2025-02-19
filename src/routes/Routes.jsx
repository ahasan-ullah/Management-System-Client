import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import WorkSheet from "../components/WorkSheet";
import DashboardIntro from "../components/DashboardIntro";
import PaymentHistory from "../components/PaymentHistory";
import EmployeeList from "../components/EmployeeList";
import EmployeeDetails from "../pages/EmployeeDetails";
import Progress from "../components/Progress";
import AllEmployeeList from "../components/AllEmployeeList";
import Payroll from "../components/Payroll";
import ContactUs from "../pages/ContactUs";
import Feedback from "../components/Feedback";
import Profile from "../pages/Profile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "employee-details",
        element: <EmployeeDetails></EmployeeDetails>,
      },
      {
        path: "contact-us",
        element: <ContactUs></ContactUs>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
            <DashboardIntro></DashboardIntro>
        ),
      },
      {
        path: "/dashboard/worksheet",
        element: <WorkSheet></WorkSheet>,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/employee-list",
        element: <EmployeeList></EmployeeList>,
      },
      {
        path: "/dashboard/progress",
        element: <Progress></Progress>,
      },
      {
        path: "/dashboard/all-employee-list",
        element: <AllEmployeeList></AllEmployeeList>,
      },
      {
        path: "/dashboard/pay-roll",
        element: <Payroll></Payroll>,
      },
      {
        path: "/dashboard/feedback",
        element: <Feedback></Feedback>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);

export default routes;
