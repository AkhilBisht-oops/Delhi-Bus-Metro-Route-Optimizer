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
      color: "border-metro",
    },
    {
      id: 2,
      title: "Direct Bus Route",
      tag: "Cheapest",
      time: 65,
      fare: 25,
      color: "border-bus",
    },
    {
      id: 3,
      title: "Airport Express",
      tag: "Premium",
      time: 35,
      fare: 120,
      color: "border-delhi",
    },
  ];

  const sortedRoutes = [...routes].sort((a, b) => {
    if (sortBy === "Fastest") return a.time - b.time;
    if (sortBy === "Cheapest") return a.fare - b.fare;
    return a.id - b.id;
  });

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900">
          Recommended Routes
        </h3>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option>Fastest</option>
            <option>Cheapest</option>
            <option>Fewest Transfers</option>
          </select>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sortedRoutes.map((route) => (
          <div
            key={route.id}
            className={`route-card bg-white rounded-xl shadow-lg p-6 border-l-4 ${
              route.color
            } ${
              selectedRoute === route.id ? "ring-2 ring-primary" : ""
            }`}
          >
            {/* Top */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg text-gray-900">
                  {route.title}
                </h4>
                <div className="flex items-center mt-2">
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                    {route.tag}
                  </span>
                  <span className="ml-3 text-gray-600">
                    <i className="fas fa-clock mr-1"></i>
                    {route.time} mins
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{route.fare}
                </div>
                <div className="text-sm text-gray-600">Total Fare</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-6">
              Detailed route steps shown here
            </div>

            <button
              onClick={() => onSelectRoute(route)}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                selectedRoute === route.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {selectedRoute === route.id
                ? "✓ Selected"
                : "Select This Route"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
