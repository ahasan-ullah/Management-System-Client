import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../provider/AuthContext";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/pay-roll", {
        params: { email: user.email },
      })
      .then((res) => {
        const payment=res.data.filter(p=>p.isPaid==='true')
        setPayments(payment);
      })
      .catch((err) => console.error(err));
  }, [user.email]);

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
