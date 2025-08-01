"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // You can send this form to your backend or API here
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-100 px-4 py-10 font-sans">
      <div className="max-w-2xl mx-auto bg-orange-50 shadow-lg rounded-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
          Contact Us
        </h1>

        <p className="text-gray-700 text-base md:text-lg mb-6 text-center">
          Have questions, or need support? Fill out the form below and we’ll get back to you.
        </p>

        {submitted ? (
          <div className="text-green-600 font-medium text-center">
            Thank you for contacting us! We will respond shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" name="name" required value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea name="message" required rows={5} value={form.message} onChange={handleChange}className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200 w-full">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
