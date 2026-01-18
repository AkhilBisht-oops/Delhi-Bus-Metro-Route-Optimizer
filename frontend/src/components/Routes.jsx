import { useEffect, useState, useMemo } from "react";
import api from "../services/api";

export default function Routes({ selectedRoute, onSelectRoute }) {
  const [sortBy, setSortBy] = useState("Fastest");
  const [expanded, setExpanded] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch routes from backend
  useEffect(() => {
    const fetchNearbyRoutes = async () => {
      try {
        setLoading(true);

        // Connaught Place coordinates (example)
        const lat = 28.6328;
        const lng = 77.2197;

        const res = await api.get(
          `/routes/nearby?lat=${lat}&lng=${lng}&radius=3000`
        );

        setRoutes(res.data.data);
      } catch (error) {
        console.error("Nearby routes fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyRoutes();
  }, []);

  // 🔹 Sorting logic (memoized)
  const sortedRoutes = useMemo(() => {
    const list = [...routes];

    if (sortBy === "Fastest") {
      // lower frequency = faster availability
      return list.sort((a, b) => (a.frequency ?? 999) - (b.frequency ?? 999));
    }

    if (sortBy === "Cheapest") {
      return list.sort(
        (a, b) => (a.fare?.min ?? 9999) - (b.fare?.min ?? 9999)
      );
    }

    return list;
  }, [routes, sortBy]);

  // 🔹 Loading
  if (loading) {
    return (
      <section className="text-gray-400 text-center py-12">
        Loading routes...
      </section>
    );
  }

  // 🔹 Error
  if (error) {
    return (
      <section className="text-red-400 text-center py-12">
        {error}
      </section>
    );
  }

  // 🔹 Empty state
  if (sortedRoutes.length === 0) {
    return (
      <section className="text-gray-400 text-center py-12">
        No routes found
      </section>
    );
  }

  return (
    <section id="routes" className="mb-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-100">
          Recommended Routes
        </h3>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#020617] border border-gray-700 text-gray-200 p-2 rounded-lg"
        >
          <option value="Fastest">Fastest</option>
          <option value="Cheapest">Cheapest</option>
        </select>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sortedRoutes.map((route) => {
          const isSelected = selectedRoute?._id === route._id;
          const isOpen = expanded === route._id;

          return (
            <div
              key={route._id}
              className={`bg-[#020617] border border-gray-800 rounded-xl p-6 
                shadow-lg transition-all duration-300
                ${
                  isSelected
                    ? "ring-2 ring-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                    : ""
                }`}
            >
              {/* Top */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-100">
                    {route.name}
                  </h4>
                  <span className="inline-block mt-2 bg-black text-gray-300 px-3 py-1 rounded-full text-xs tracking-wide">
                    {route.type?.toUpperCase()}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-400">
                    ₹{route.fare?.min}–{route.fare?.max}
                  </p>
                  <p className="text-sm text-gray-400">
                    Every {route.frequency ?? "—"} mins
                  </p>
                </div>
              </div>

              {/* Route Stops */}
              {route.stops?.length > 0 && (
                <>
                  <button
                    onClick={() =>
                      setExpanded(isOpen ? null : route._id)
                    }
                    className="text-sm text-blue-400 hover:underline mb-3"
                  >
                    {isOpen ? "Hide route details" : "View route details"}
                  </button>

                  {isOpen && (
                    <ul className="mb-4 space-y-2 text-gray-400 text-sm">
                      {route.stops.map((stop, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-blue-500">
                            {index + 1}.
                          </span>
                          {stop.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {/* Select Button */}
              <button
                onClick={() => onSelectRoute(route)}
                className={`w-full py-3 rounded-lg font-semibold transition
                  ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
              >
                {isSelected ? "✓ Selected" : "Select Route"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
