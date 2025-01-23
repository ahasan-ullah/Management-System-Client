import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkRecords = () => {
  const [workRecords, setWorkRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  useEffect(() => {
    axios
      .get("https://management-system-server-9y2z6ohsz-ahasan-ullahs-projects.vercel.app/users")
      .then((res) => {
        if (res.data) {
          setEmployees(res.data);
        }
      })
      .catch((err) => console.error("Error fetching employees:", err));
    axios
      .get("https://management-system-server-9y2z6ohsz-ahasan-ullahs-projects.vercel.app/tasks")
      .then((res) => {
        if (res.data) {
          setWorkRecords(res.data);
          setFilteredRecords(res.data);
        }
      })
      .catch((err) => console.error("Error fetching work records:", err));
  }, []);

  useEffect(() => {
    let filtered = workRecords;

    if (selectedEmployee) {
      filtered = filtered.filter(
        (record) => record.email === selectedEmployee
      );
    }
    if (selectedMonth) {
      filtered = filtered.filter((record) => {
        const recordMonth = new Date(record.date).getMonth() + 1;
        return recordMonth === parseInt(selectedMonth);
      });
    }

    setFilteredRecords(filtered);
  }, [selectedEmployee, selectedMonth, workRecords]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center">Work Records</h1>

      <div className="filters mt-4 mb-6 flex space-x-5">
        <div className="employee-filter mb-4">
          <label className="block text-lg">Select Employee</label>
          <select
            className="select select-bordered"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {employees.map((emp) => (
              <option key={emp.email} value={emp.email}>
                {emp.name || emp.email}
              </option>
            ))}
          </select>
        </div>

        <div className="month-filter mb-4">
          <label className="block text-lg">Select Month</label>
          <select
            className="select select-bordered"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>

      <div className="work-records mt-6">
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Task</th>
              <th>Date</th>
              <th>Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record._id}>
                  <td>{record.email}</td>
                  <td>{record.taskType}</td>
                  <td>{record.date}</td>
                  <td>{record.hourWorked}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkRecords;
