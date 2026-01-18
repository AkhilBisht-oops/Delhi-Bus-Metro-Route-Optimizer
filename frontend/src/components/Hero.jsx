import { useState } from "react";

export default function Hero({
  from,
  to,
  time,
  setFrom,
  setTo,
  setTime,
  onFindRoute,
  loading,
}) {
  const [fastest, setFastest] = useState(true);
  const [cheapest, setCheapest] = useState(false);
  const [lessWalking, setLessWalking] = useState(true);

  return (
    <section
      id="home"
      className="bg-gradient-to-b from-[#020617] via-[#020617] to-[#020617] py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Smart Route Planning for Delhi Commuters
          </h2>

          <p className="text-lg text-gray-400 mb-10">
            Find the fastest, cheapest, and most convenient routes combining
            Delhi Metro and DTC buses
          </p>

          {/* Form Card */}
          <div
            className="bg-[#020617] border border-gray-800 rounded-2xl p-6 md:p-8
                       shadow-[0_0_40px_rgba(0,0,0,0.9)]"
          >
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Starting Point"
                className="dark-input"
              />

              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination"
                className="dark-input"
              />

              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="dark-input"
              />
            </div>

            {/* Options + Button */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Checkboxes */}
              <div className="flex gap-6 text-gray-300 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fastest}
                    onChange={() => setFastest(!fastest)}
                    className="accent-blue-500 w-4 h-4"
                  />
                  Fastest
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cheapest}
                    onChange={() => setCheapest(!cheapest)}
                    className="accent-blue-500 w-4 h-4"
                  />
                  Cheapest
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lessWalking}
                    onChange={() => setLessWalking(!lessWalking)}
                    className="accent-blue-500 w-4 h-4"
                  />
                  Less Walking
                </label>
              </div>

              {/* Button */}
              <button
                onClick={onFindRoute}
                disabled={loading}
                className="flex items-center justify-center gap-2
                           px-8 py-3 rounded-xl font-medium text-white
                           bg-blue-600 hover:bg-blue-500 transition
                           disabled:opacity-60
                           shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Finding Routes...
                  </>
                ) : (
                  <>
                    <i className="fas fa-route"></i>
                    Find Optimal Route
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind helper styles */}
      <style>
        {`
          .dark-input {
            background-color: #020617;
            border: 1px solid #1f2933;
            color: #e5e7eb;
            padding: 0.75rem;
            border-radius: 0.75rem;
            outline: none;
            transition: all 0.2s ease;
          }

          .dark-input::placeholder {
            color: #6b7280;
          }

          .dark-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 1px #3b82f6;
          }
        `}
      </style>
    </section>
  );
}
