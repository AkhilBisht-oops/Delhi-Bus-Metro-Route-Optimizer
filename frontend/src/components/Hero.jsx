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
  // Local UI-only state (this is OK)
  const [fastest, setFastest] = useState(true);
  const [cheapest, setCheapest] = useState(false);
  const [lessWalking, setLessWalking] = useState(true);

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Smart Route Planning for Delhi Commuters
          </h2>

          <p className="text-xl mb-8 opacity-90">
            Find the fastest, cheapest, and most convenient routes combining
            Delhi Metro and DTC buses
          </p>

          <div className="bg-white rounded-xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              
              {/* From */}
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Starting Point"
                className="p-3 border rounded-lg text-gray-900"
              />

              {/* To */}
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination"
                className="p-3 border rounded-lg text-gray-900"
              />

              {/* Time */}
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="p-3 border rounded-lg text-gray-900"
              />
            </div>

            {/* Options + Button */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-4 text-gray-700">
                <label>
                  <input
                    type="checkbox"
                    checked={fastest}
                    onChange={() => setFastest(!fastest)}
                  />{" "}
                  Fastest
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={cheapest}
                    onChange={() => setCheapest(!cheapest)}
                  />{" "}
                  Cheapest
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={lessWalking}
                    onChange={() => setLessWalking(!lessWalking)}
                  />{" "}
                  Less Walking
                </label>
              </div>

              <button
                onClick={onFindRoute}
                disabled={loading}
                className="bg-accent text-white px-8 py-3 rounded-lg font-semibold flex items-center"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Finding Routes...
                  </>
                ) : (
                  <>
                    <i className="fas fa-route mr-2"></i>
                    Find Optimal Route
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
