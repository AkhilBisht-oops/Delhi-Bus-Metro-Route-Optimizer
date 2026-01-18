import { useEffect, useState } from "react";

export default function FareCalculator({ selectedRoute }) {
  const [transport, setTransport] = useState("metro");
  const [distance, setDistance] = useState("");
  const [fare, setFare] = useState(null);

  useEffect(() => {
    if (!selectedRoute) return;

    if (selectedRoute.title.includes("Airport")) {
      setTransport("airport");
      setDistance("");
    } else if (selectedRoute.title.includes("Bus")) {
      setTransport("bus");
      setDistance(20);
    } else {
      setTransport("metro");
      setDistance(15);
    }
  }, [selectedRoute]);

  const calculateFare = () => {
    if (transport === "airport") setFare(120);
    else if (transport === "bus") setFare(distance * 1.5);
    else setFare(distance * 4);
  };

  return (
    <section
      id="fare-calculator"
      className="bg-[#020617] border border-gray-800 rounded-xl p-6 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-gray-100 mb-6">
        Fare Calculator
      </h3>

      <select
        value={transport}
        onChange={(e) => setTransport(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 text-gray-200"
      >
        <option value="metro">Metro</option>
        <option value="bus">Bus</option>
        <option value="airport">Airport Express</option>
      </select>

      {transport !== "airport" && (
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Distance (km)"
          className="w-full mb-4 p-3 rounded-lg bg-black border border-gray-700 text-gray-200"
        />
      )}

      <button
        onClick={calculateFare}
        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition"
      >
        Calculate Fare
      </button>

      {fare !== null && (
        <div className="mt-6 bg-black border border-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Fare</p>
          <p className="text-3xl font-bold text-blue-400">
            ₹{fare}
          </p>
        </div>
      )}
    </section>
  );
}
