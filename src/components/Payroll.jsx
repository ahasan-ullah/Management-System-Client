import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const fetchPayrolls = async () => {
  const { data } = await axios.get("https://management-system-server-9y2z6ohsz-ahasan-ullahs-projects.vercel.app/pay-roll");
  return data;
};

const Payroll = () => {
  // const [payrolls,setPayrolls]=useState([]);

  const { data: payrolls, isLoading, isError, error } = useQuery({
    queryKey: ["payrolls"],
    queryFn: fetchPayrolls,
    refetchOnWindowFocus: false,
  });

  // useEffect(()=>{
  //   axios.get('https://management-system-server-9y2z6ohsz-ahasan-ullahs-projects.vercel.app/pay-roll').then(res=>setPayrolls(res.data))
  // },[payrolls]);


  const handlePay=(id)=>{
    const transactionId = Math.floor(10000000 + Math.random() * 90000000);
    const data={
      isPaid: 'true',
      transactionId: transactionId
    }

    axios
      .patch(
        "https://management-system-server-9y2z6ohsz-ahasan-ullahs-projects.vercel.app/pay-roll",
        {data} ,
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
      .catch((err) => {});
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
            {payrolls?.map((payroll) => (
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
