import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import LoadingPage from "./LoadingPage";

const EmployeeDetails = () => {
  const { state } = useLocation();
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/pay-roll", {
        params: { email: state.email },
      })
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [state.email]);

  if (loading) return <LoadingPage></LoadingPage>;

  const MyBarChart = () => {
    const formattedData = employee.map((item) => ({
      monthYear: `${item.month}-${item.year}`,
      salary: parseInt(item.salary),
    }));

    return (
      <div className="mt-20">
        <h3 className="text-center text-3xl font-bold">
          Salary vs. Month and Year
        </h3>
        <div className="mt-10">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthYear" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center items-center">
          <Link
            to={"/dashboard/employee-list"}
            className="btn btn-neutral mt-10"
          >
            Back
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-20 p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <img
          src={state.photo}
          alt={state.name}
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover mr-6"
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{state.name}</h1>
          <p className="text-xl text-gray-600">{state.designation}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-50 rounded-xl shadow-inner">
          <h3 className="text-lg font-bold text-gray-700">Salary</h3>
          <p className="text-xl text-gray-900">
            {employee.length > 0 ? `$${employee[0].salary}` : "Loading..."}
          </p>
        </div>
      </div>
      <MyBarChart />
    </div>
  );
};

export default EmployeeDetails;
