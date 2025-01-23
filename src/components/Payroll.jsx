import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Payroll = () => {
  const [payrolls,setPayrolls]=useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/pay-roll').then(res=>setPayrolls(res.data))
  },[payrolls]);


  const handlePay=(id)=>{
    console.log(id)
    axios
      .patch(
        "http://localhost:5000/pay-roll",
        { isPaid: "true" },
        {
          params: { id: `${id}` },
        }
      )
      .then((res) => {
        if (res.statusText === "OK") {
          Swal.fire({
            title: "Payment Done!",
            text: "Payment Done",
            icon: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-4">Make Payment</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th className="border">Email</th>
              <th className="border">Month</th>
              <th className="border">Year</th>
              <th className="border">Salary</th>
              <th className="border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((payroll) => (
              <tr key={payroll._id}>
                <td className="border">{payroll.email}</td>
                <td className="border">{payroll.month}</td>
                <td className="border">{payroll.year}</td>
                <td className="border">{payroll.salary}</td>
                <td className="border"><button onClick={()=>{handlePay(payroll._id)}} disabled={payroll.isPaid==='true'} className="btn btn-neutral btn-sm">{payroll.isPaid?'Paid':'Pay'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
