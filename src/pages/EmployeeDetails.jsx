import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import axios from "axios";

const EmployeeDetails = () => {
  const { state } = useLocation();
  const [employee, setEmployee] = useState(null);
  const [chartData, setChartData] = useState([]);
  console.log(state);

  useEffect(()=>{
    axios.get('http://localhost:5000/pay-roll',{
      params: {email: state.email}
    }).then(res=>setEmployee(res.data))
  },[])

  return (
    <div className="employee-details">
      {/* <div className="info-section">
        <img src={employee.photoURL} alt={`${employee.name}'s photo`} className="employee-photo" />
        <h2>{employee.name}</h2>
        <p><strong>Designation:</strong> {employee.designation}</p>
      </div>

      <div className="chart-section">
        <h3>Salary vs. Month and Year</h3>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" label={{ value: "Month", position: "insideBottom", dy: 10 }} />
          <YAxis label={{ value: "Salary", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="salary" fill="#8884d8" />
        </BarChart>
      </div> */}
    </div>
  );
};

export default EmployeeDetails;
