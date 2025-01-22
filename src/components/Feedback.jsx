import axios from "axios";
import { useState } from "react";

const Feedback = () => {
  const [feedbacks,setFeedbacks]=useState([]);
  axios.get('http://localhost:5000/feedback').then(res=>{setFeedbacks(res.data)})
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-4">User's Feedback</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th className="border">Email</th>
              <th className="border">Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td className="border">{feedback.email}</td>
                <td className="border">{feedback.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
