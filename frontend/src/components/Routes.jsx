import { useState } from "react";

export default function Routes({ selectedRoute, onSelectRoute }) {
  const [sortBy, setSortBy] = useState("Fastest");

  const routes = [
    {
      id: 1,
      title: "Metro + Bus Combo",
      tag: "Fastest",
      time: 45,
      fare: 60,
      color: "border-blue-500",
    },
    {
      id: 2,
      title: "Direct Bus Route",
      tag: "Cheapest",
      time: 65,
      fare: 25,
      color: "border-green-500",
    },
    {
      id: 3,
      title: "Airport Express",
      tag: "Premium",
      time: 35,
      fare: 120,
      color: "border-purple-500",
    },
  ];

  const sortedRoutes = [...routes].sort((a, b) => {
    if (sortBy === "Fastest") return a.time - b.time;
    if (sortBy === "Cheapest") return a.fare - b.fare;
    return a.id - b.id;
  });

  return (
    <section id="routes" className="mb-12">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-100">
          Recommended Routes
        </h3>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#020617] border border-gray-700 text-gray-200 p-2 rounded-lg"
        >
          <option>Fastest</option>
          <option>Cheapest</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sortedRoutes.map((route) => (
          <div
            key={route.id}
            className={`bg-[#020617] border ${route.color} 
              rounded-xl p-6 shadow-lg transition
              ${
                selectedRoute?.id === route.id
                  ? "ring-2 ring-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                  : "border-gray-800"
              }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-100">
                  {route.title}
                </h4>
                <span className="inline-block mt-2 bg-black text-gray-300 px-3 py-1 rounded-full text-sm">
                  {route.tag}
                </span>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-blue-400">
                  ₹{route.fare}
                </p>
                <p className="text-sm text-gray-400">
                  {route.time} mins
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Optimized route with minimal transfers and walking.
            </p>

            <button
              onClick={() => onSelectRoute(route)}
              className={`w-full py-3 rounded-lg font-semibold transition
                ${
                  selectedRoute?.id === route.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
              {selectedRoute?.id === route.id
                ? "✓ Selected"
                : "Select Route"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
