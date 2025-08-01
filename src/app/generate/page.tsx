"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/generate-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredients.split(",").map((i) => i.trim()),
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history");
      if (!res.ok) throw new Error("Failed to fetch history");

      const data = await res.json();
      setHistory(data); // ← Ensure your API returns a plain array
      setShowHistory(true);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-amber-200 px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-emerald-700">
          Recipe Generator
        </h1>

        <textarea
          className="w-full p-3 border-2 border-emerald-300 rounded-lg mb-4 focus:outline-none focus:border-emerald-500 transition"
          placeholder="Enter ingredients separated by commas"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={4}
        />

        <button
          onClick={handleGenerate}
          className="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 mb-2"
          disabled={loading || !ingredients.trim()}
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>

        <button
          onClick={fetchHistory}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg transition"
        >
          View History
        </button>

        {loading && (
          <p className="mt-4 text-center text-emerald-700 animate-pulse">
            Generating recipe...
          </p>
        )}

        {result && !result.error && (
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-center text-emerald-800">
              {result.title}
            </h2>
            <div
              className="prose prose-sm md:prose-base max-w-none bg-emerald-50 rounded-lg p-4 mb-4"
              dangerouslySetInnerHTML={{ __html: result.recipe }}
            />
            {result.image && (
              <img
                src={result.image}
                alt={result.title}
                className="mx-auto mt-4 w-full max-w-xs rounded-lg shadow"
              />
            )}
          </div>
        )}

        {result?.error && (
          <p className="text-red-600 text-center mt-4">{result.error}</p>
        )}

        {showHistory && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-center text-emerald-800 mb-4">
              Recipe History
            </h2>
            {history.length === 0 ? (
              <p className="text-center text-gray-600">No history available.</p>
            ) : (
              <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {history.map((recipe: any, index: number) => (
                  <li
                    key={index}
                    className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                  >
                    <p className="text-lg font-bold text-emerald-700 mb-1">
                      {recipe.title}
                    </p>
                    <p className="text-sm text-gray-800 mb-1">
                      <span className="font-medium">Ingredients:</span>{" "}
                      {recipe.ingredients.join(", ")}
                    </p>
                    <hr className="my-2 border-amber-300" />
                    <div
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{ __html: recipe.html }}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(recipe.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
