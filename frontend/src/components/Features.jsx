import { useEffect, useState } from "react";

export default function Features() {
  const [features, setFeatures] = useState([]);

  // 🔹 Load features (can be replaced by API later)
  useEffect(() => {
    setFeatures([
      {
        id: 1,
        title: "Real-time Updates",
        description:
          "Live metro timings and bus locations for accurate planning",
        icon: "fas fa-bolt",
        color: "primary",
      },
      {
        id: 2,
        title: "Fare Comparison",
        description:
          "Compare costs across different transport combinations",
        icon: "fas fa-indian-rupee-sign",
        color: "bus",
      },
      {
        id: 3,
        title: "Multi-modal Routes",
        description:
          "Seamless integration of metro, bus, and walking routes",
        icon: "fas fa-route",
        color: "metro",
      },
      {
        id: 4,
        title: "Mobile Friendly",
        description:
          "Optimized for use on smartphones while commuting",
        icon: "fas fa-mobile-alt",
        color: "accent",
      },
    ]);
  }, []);

  return (
    <section className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Why Choose Delhi Route Optimizer?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >
            <div
              className={`w-16 h-16 bg-${feature.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <i
                className={`${feature.icon} text-${feature.color} text-2xl`}
              ></i>
            </div>

            <h4 className="font-bold text-lg mb-2">
              {feature.title}
            </h4>

            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
