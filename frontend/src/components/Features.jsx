import { useEffect, useState } from "react";

export default function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    setFeatures([
      {
        id: 1,
        title: "Real-time Updates",
        description: "Live metro & bus timings",
        icon: "fa-bolt",
      },
      {
        id: 2,
        title: "Fare Comparison",
        description: "Choose cheapest route",
        icon: "fa-indian-rupee-sign",
      },
      {
        id: 3,
        title: "Multi-modal Routes",
        description: "Metro + Bus + Walk",
        icon: "fa-route",
      },
      {
        id: 4,
        title: "Mobile Friendly",
        description: "Optimized for commuters",
        icon: "fa-mobile-screen-button",
      },
    ]);
  }, []);

  return (
    <section id="features" className="mb-20">
      <h3 className="text-3xl font-bold text-white mb-12 text-center">
        Why Choose Delhi Route Optimizer?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-[#020617] border border-gray-800 rounded-2xl p-8
                       text-center relative overflow-hidden
                       shadow-[0_0_30px_rgba(0,0,0,0.9)]
                       hover:border-blue-500 transition"
          >
            {/* Glowing Icon */}
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div
                className="absolute inset-0 rounded-full
                           bg-blue-600 opacity-30 blur-xl"
              ></div>

              <div
                className="relative w-16 h-16 rounded-full
                           bg-[#020617] border border-blue-500
                           flex items-center justify-center"
              >
                <i
                  className={`fas ${feature.icon} text-blue-400 text-xl`}
                ></i>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-white mb-2">
              {feature.title}
            </h4>

            <p className="text-sm text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
