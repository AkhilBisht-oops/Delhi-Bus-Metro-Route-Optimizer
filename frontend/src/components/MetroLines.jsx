import { useEffect, useState } from "react";

export default function MetroLines() {
  const [lines, setLines] = useState([]);

  // 🔹 Load metro lines data (API-ready)
  useEffect(() => {
    setLines([
      {
        id: 1,
        name: "Red Line",
        route: "Rithala - Shaheed Sthal",
        color: "#FF6B35",
      },
      {
        id: 2,
        name: "Yellow Line",
        route: "Samaypur Badli - HUDA City Centre",
        color: "#FFD700",
      },
      {
        id: 3,
        name: "Blue Line",
        route: "Dwarka Sec 21 - Noida Electronic City",
        color: "#2563EB",
      },
      {
        id: 4,
        name: "Green Line",
        route: "Inderlok - Brigadier Hoshiar Singh",
        color: "#22C55E",
      },
      {
        id: 5,
        name: "Violet Line",
        route: "Kashmere Gate - Raja Nahar Singh",
        color: "#A855F7",
      },
      {
        id: 6,
        name: "Airport Express",
        route: "New Delhi - Dwarka Sec 21",
        color: "#F97316",
      },
    ]);
  }, []);

  return (
    <section id="metro-map" className="mb-12">
      <h3 className="text-2xl font-bold text-gray-100 mb-6">
        Delhi Metro Lines
      </h3>

      <div className="bg-[#020617] border border-gray-800 rounded-xl shadow-lg">
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {lines.map((line) => (
              <div
                key={line.id}
                className="rounded-xl p-4 text-center
                           border border-gray-800
                           hover:scale-105 transition-transform
                           hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                style={{
                  background: `linear-gradient(135deg, ${line.color}22, #020617)`,
                  borderColor: `${line.color}55`,
                }}
              >
                <i
                  className="fas fa-train text-2xl mb-2"
                  style={{ color: line.color }}
                ></i>

                <div
                  className="font-semibold"
                  style={{ color: line.color }}
                >
                  {line.name}
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  {line.route}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
