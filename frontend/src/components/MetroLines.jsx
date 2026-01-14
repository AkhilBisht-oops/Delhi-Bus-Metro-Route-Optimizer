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
        bg: "#FF6B35",
        text: "white",
      },
      {
        id: 2,
        name: "Yellow Line",
        route: "Samaypur Badli - HUDA City Centre",
        bg: "#FFD700",
        text: "#333",
      },
      {
        id: 3,
        name: "Blue Line",
        route: "Dwarka Sec 21 - Noida Electronic City",
        bg: "#0000FF",
        text: "white",
      },
      {
        id: 4,
        name: "Green Line",
        route: "Inderlok - Brigadier Hoshiar Singh",
        bg: "#00A859",
        text: "white",
      },
      {
        id: 5,
        name: "Violet Line",
        route: "Kashmere Gate - Raja Nahar Singh",
        bg: "#800080",
        text: "white",
      },
      {
        id: 6,
        name: "Airport Express",
        route: "New Delhi - Dwarka Sec 21",
        bg: "#FF9933",
        text: "white",
      },
    ]);
  }, []);

  return (
    <section className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Delhi Metro Lines
      </h3>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {lines.map((line) => (
              <div
                key={line.id}
                className="text-center p-4 rounded-lg"
                style={{
                  backgroundColor: line.bg,
                  color: line.text,
                }}
              >
                <i className="fas fa-train text-2xl mb-2"></i>
                <div className="font-bold">{line.name}</div>
                <div className="text-sm opacity-90">{line.route}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
