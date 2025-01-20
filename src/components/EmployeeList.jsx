import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";

const EmployeeList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from API
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  // Handle Pay button click
  const handlePay = (user) => {
    alert(`Paying salary to ${user.name}`);
    // Implement your payment logic here
  };

  // Handle Details button click
  const handleDetails = (user) => {
    alert(`Showing details of ${user.name}`);
    // Implement details logic here
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
      accessorKey: "isVerified",
      header: "Verified",
      cell: (props) => (props.getValue() ? "✅" : "❌"),
    },
    {
      accessorKey: "bankAcc",
      header: "Bank Account",
    },
    {
      accessorKey: "salary",
      header: "Salary",
    },
    {
      header: "Pay",
      cell: ({ row }) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handlePay(row.original)}
        >
          Pay
        </button>
      ),
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleDetails(row.original)}
        >
          Details
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h2 className="text-center text-3xl font-bold">Employee List</h2>
      <table className="table w-full border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-4 py-2">
                  {header.column.columnDef.header}
                </th>
              ))}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
