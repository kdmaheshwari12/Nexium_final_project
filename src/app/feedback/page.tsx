"use client";

import React, { useState, useEffect } from "react";

const Star = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  filled: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => (
  <span
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`cursor-pointer text-3xl transition-colors ${
      filled ? "text-yellow-400" : "text-gray-300"
    }`}
    aria-label={filled ? "Filled star" : "Empty star"}
  >
    ★
  </span>
);

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [allFeedback, setAllFeedback] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, message: feedback }),
    });

    if (res.ok) {
      setSubmitted(true);
      setFeedback("");
      setRating(0);
      fetchFeedback();
    }
  };

  const fetchFeedback = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    if (data.success) setAllFeedback(data.feedbacks);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-green-200 to-amber-200 rounded-xl shadow-md my-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Feedback Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-lg font-medium">Your Rating:</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= (hover || rating)}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>
        <label className="block text-lg font-medium">Your Feedback:</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          className="w-full p-3 border rounded-lg text-base"
          placeholder="Write your feedback..."
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Submit
        </button>
        {submitted && (
          <p className="text-green-600 text-center mt-3">
            Thank you for your feedback!
          </p>
        )}
      </form>

      {/* Feedback List */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">User Feedback</h3>
        {allFeedback.length === 0 ? (
          <p className="text-gray-500">No feedback yet.</p>
        ) : (
          <ul className="space-y-4">
            {allFeedback.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 border rounded-md shadow-sm"
              >
                <div className="flex items-center space-x-2 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        star <= item.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-800">{item.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
