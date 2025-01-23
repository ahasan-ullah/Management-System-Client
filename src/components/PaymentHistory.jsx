import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../provider/AuthContext";

const fetchPayments = async (email) => {
  const { data } = await axios.get("https://management-system-server-amber.vercel.app/pay-roll", {
    params: { email },
  });
  return data.filter((p) => p.isPaid === "true");
};

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  // const [payments, setPayments] = useState([]);


  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: () => fetchPayments(user.email),
    enabled: !!user.email,
  });

  // useEffect(() => {
  //   axios
  //     .get("https://management-system-server-amber.vercel.app/pay-roll", {
  //       params: { email: user.email },
  //     })
  //     .then((res) => {
  //       const payment=res.data.filter(p=>p.isPaid==='true')
  //       setPayments(payment);
  //     })
  //     .catch((err) => console.error(err));
  // }, [user.email]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date (Month-Year) </th>
              <th>Amount</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.month}-{payment.year}</td>
                <td>${payment.salary}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
