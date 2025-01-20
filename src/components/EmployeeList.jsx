import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

const EmployeeList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from API
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  }, [users]);

  // Handle Pay button click
  const handlePay = (user) => {
    alert(`Paying salary to ${user._id}`);
    // Implement your payment logic here
  };

  // Handle Details button click
  const handleDetails = (user) => {
    alert(`Showing details of ${user.name}`);
    // Implement details logic here
  };

  const handleVerify = (user) => {
    const updatedVerifiedStatus = !user.isVerified;
    axios
      .patch(
        "http://localhost:5000/users",
        { updatedVerifiedStatus },
        {
          params: { id: `${user._id}` },
        }
      )
      .then((res) => {
        if (res.statusText === "OK") {
          Swal.fire({
            title: "Updated!",
            text: "Employee verification status updated",
            icon: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "bankAcc",
      header: "Bank Account",
    },
    {
      accessorKey: "salary",
      header: "Salary",
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
                <th className="border">Verify</th>
                <th className="border">Pay</th>
                <th className="border">Details</th>
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
                    onClick={() => handleVerify(row.original)}
                  >
                    {row.original.isVerified ? <TiTick /> : <ImCross />}
                  </button>
                </td>
                <td className="border">
                  <button
                    className="btn btn-neutral btn-sm"
                    disabled={!row.original.isVerified}
                    onClick={() => handlePay(row.original)}
                  >
                    Pay
                  </button>
                </td>
                <td className="border">
                  <button
                    className="btn btn-neutral btn-sm"
                    onClick={() => handleDetails(row.original)}
                  >
                    Details
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

export default EmployeeList;
