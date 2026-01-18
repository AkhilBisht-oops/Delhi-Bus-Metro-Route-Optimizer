import { useEffect, useState } from "react";

export default function FareCalculator({ selectedRoute }) {
  const [distance, setDistance] = useState("");
  const [fare, setFare] = useState(null);

  useEffect(() => {
    if (!selectedRoute) return;

    // Estimate distance by number of stops (demo logic)
    setDistance(selectedRoute.stops.length * 2);
    setFare(null);
  }, [selectedRoute]);

  if (!selectedRoute) {
    return (
      <section
        id="fare-calculator"
        className="bg-[#020617] border border-gray-800 rounded-xl p-6 text-gray-400"
      >
        Select a route to calculate fare
      </section>
    );
  }

  const calculateFare = () => {
    const avg = (selectedRoute.fare.min + selectedRoute.fare.max) / 2;
    setFare(avg);
  };

  return (
    <section
      id="fare-calculator"
      className="bg-[#020617] border border-gray-800 rounded-xl p-6 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-gray-100 mb-6">
        Fare Calculator
      </h3>

      <div className="space-y-3 text-gray-300 mb-4">
        <p>
          <strong>Route:</strong> {selectedRoute.name}
        </p>
        <p>
          <strong>Type:</strong> {selectedRoute.type}
        </p>
        <p>
          <strong>Stops:</strong> {selectedRoute.stops.length}
        </p>
      </div>

      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Estimated distance (km)"
        className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 text-gray-200"
      />

      <button
        onClick={calculateFare}
        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold
          hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition"
      >
        Calculate Fare
      </button>

      {fare !== null && (
        <div className="mt-6 bg-black border border-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Estimated Fare</p>
          <p className="text-3xl font-bold text-blue-400">
            ₹{fare}
          </p>
        </div>
      )}
    </section>
  );
}
