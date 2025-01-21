import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthContext from "../provider/AuthContext";

const AllEmployeeList = () => {
  const [users, setUsers] = useState([]);
  const [salary, setSalary] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate=useNavigate();
  const {fireUser}=useContext(AuthContext);

  useEffect(() => {
    // Fetch user data from API
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  }, [users]);

  const handleMakeHR=(user)=>{
    if(user.role!=='HR'){
    const HR='HR';
    axios
      .patch(
        "http://localhost:5000/users",
        { HR },
        {
          params: { id: `${user._id}` },
        }
      )
      .then((res) => {
        if (res.statusText === "OK") {
          Swal.fire({
            title: "Updated!",
            text: "Promoted to HR",
            icon: "success",
          });
        }
      })
      .catch((err) => console.log(err));
    }
  }

  const handleFire=(user)=>{
    const fireStatus = true;
    axios
      .patch(
        "http://localhost:5000/users",
        { fireStatus },
        {
          params: { id: `${user._id}` },
        }
      )
      .then((res) => {
        if (res.statusText === "OK") {
          Swal.fire({
            title: "Updated!",
            text: "Employee Fired",
            icon: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-5">
      <h2 className="text-center text-3xl font-bold">Employee List</h2>
      <div className="overflow-x-auto mb-5">
        <table className="table w-full border mt-5">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border px-4 py-2">
                    {header.column.columnDef.header}
                  </th>
                ))}
                <th className="border">Role Activity</th>
                <th className="border">Fire Activity</th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-4 py-2">
                    {cell.renderValue()}
                  </td>
                ))}
                <td className="border">
                  <button
                    className="btn btn-neutral btn-sm"
                    onClick={() => handleMakeHR(row.original)}
                    disabled={row.original.role==='HR'}
                  >
                    Make HR
                  </button>
                </td>
                <td className="border">
                  <button
                    className="btn btn-neutral btn-sm"
                    disabled={row.original.isFired}
                    onClick={() => handleFire(row.original)}
                  >
                    {row.original.isFired?'Fired':'Fire'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeeList;
