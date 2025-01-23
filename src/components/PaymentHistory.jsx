import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../provider/AuthContext";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/payments", {
  //       params: { email: user.email },
  //     })
  //     .then((res) => {
  //       setPayments(res.data);
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
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>${payment.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
