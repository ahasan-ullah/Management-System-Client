import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const fetchEmployees = async () => {
  const { data } = await axios.get("http://localhost:5000/users");
  return data.filter((user) => user.role === "Employee");
};

const EmployeeList = () => {
  // const [users, setUsers] = useState([]);
  const [salary, setSalary] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate=useNavigate();

  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   axios.get("http://localhost:5000/users").then((res) => {
  //     const employees = res.data.filter(user => user.role === 'Employee');
  //     setUsers(employees);
  //   });
  // }, [users]);


  // Handle Pay button click
  const handlePay = (e) => {
    e.preventDefault();
    const form = e.target;
    const month = form.month.value;
    const year = form.year.value;

    const payroll = {
      salary,
      month,
      year,
      email,
    };

    axios
      .post("http://localhost:5000/pay-roll", payroll)
      .then((res) => {
        Swal.fire({
          title: "Added!",
          text: "Added to payment",
          icon: "success",
        });
      })
      .catch((error) => {});
  };

  // Handle Details button click
  const handleDetails = (user) => {
    navigate('/employee-details', {
      state: {
        name: `${user.name}`,
        email: `${user.email}`,
        photo: `${user.photo}`,
        designation: `${user.designation}`,
      },
    });
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
                    onClick={() => {
                      document.getElementById("pay_modal").showModal();
                      setSalary(row.original.salary);
                      setEmail(row.original.email);
                    }}
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

      <dialog id="pay_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handlePay} className="card-body">
            {/* email field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Salary</span>
              </label>
              <input
                type="text"
                name="salary"
                className="input input-bordered"
                defaultValue={salary}
                readOnly
              />
            </div>
            {/* pass field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Month</span>
              </label>
              <input
                type="text"
                name="month"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Year</span>
              </label>
              <input
                type="text"
                name="year"
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-neutral">Pay</button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EmployeeList;
