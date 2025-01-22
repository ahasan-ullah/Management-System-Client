import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form=e.target;
    const email=form.email.value;
    const message=form.message.value;

    const feedback={
      email,
      message
    }
    console.log(feedback);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 mt-20">
      <div className="w-full max-w-xl bg-white p-6 relative">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Get in Touch
        </h2>

        <div className="text-center mb-6">
          <p className="text-lg font-medium text-gray-600">Visit us at:</p>
          <p className="text-sm font-semibold text-gray-500">
            1229 Khilkhet, Dhaka
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <HiOutlineMail className="absolute top-3.5 left-3 text-xl text-gray-400" />
            <input
              type="email"
              name="email"
              required
              className="input w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Your Email Address"
            />
          </div>

          {/* Message Field */}
          <div className="relative">
            <BiMessageDetail className="absolute top-3.5 left-3 text-xl text-gray-400" />
            <textarea
              name="message"
              required
              className="textarea w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="4"
              placeholder="Your Message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-r from-indigo-500 to-blue-500 py-3 rounded-lg text-lg font-medium shadow-lg hover:opacity-90 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
