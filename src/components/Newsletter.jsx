import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("Thank you for subscribing! 🎉");
    setEmail("");
  };

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">📩 Stay Updated!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Subscribe to our newsletter and get the latest updates, news, and exclusive content straight to your inbox.
        </p>

        <div className="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-3 w-full md:w-2/3 rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-gray-500"
          />
          <button
            onClick={handleSubscribe}
            className="bg-black text-white font-semibold px-6 py-3 rounded-lg transition hover:bg-gray-900"
          >
            Subscribe Now
          </button>
        </div>

        {message && <p className="mt-4 text-lg text-green-600">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
