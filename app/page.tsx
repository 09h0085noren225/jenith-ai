"use client";
import React, { useState } from 'react';
import { Sparkles, BookOpen, Send, User, Bot, CheckCircle } from 'lucide-react';

export default function Home() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const generateNotes = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setNotes(data.text || "Failed to generate notes.");
    } catch (err) {
      setNotes("Error generating notes. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800">
      {/* Header */}
      <header className="bg-sky-500 text-white p-4 shadow-md flex justify-between items-center px-8">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-wide">JenithAI</h1>
        </div>
        <span className="bg-sky-600 text-xs px-3 py-1 rounded-full font-medium">Student Dashboard</span>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Banner */}
        <div className="bg-sky-100 border border-sky-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-sky-900">Welcome to JenithAI 🚀</h2>
            <p className="text-sky-700 text-sm mt-1">Your personal smart study assistant powered by Gemini.</p>
          </div>
          <Sparkles className="w-12 h-12 text-sky-500" />
        </div>

        {/* AI Study Generator Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-sky-100 space-y-4">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <Bot className="text-sky-500" /> AI Study Note Generator
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter topic (e.g., Photosynthesis, Quantum Physics...)"
              className="flex-1 border border-sky-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button
              onClick={generateNotes}
              disabled={loading}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition disabled:opacity-50"
            >
              {loading ? "Generating..." : <><Send className="w-4 h-4" /> Generate</>}
            </button>
          </div>

          {/* Result Output */}
          {notes && (
            <div className="mt-4 p-4 bg-sky-50 rounded-lg border border-sky-200 whitespace-pre-wrap text-slate-700">
              {notes}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
