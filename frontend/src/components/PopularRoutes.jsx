import { popularRoutes } from "../data/routesData";

export default function PopularRoutes({ onPlanRoute }) {
  return (
    <section>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Popular Delhi Routes
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularRoutes.map((route) => (
          <div
            key={route.id}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-start mb-4">
              <img
                src={route.image}
                alt={`${route.from} to ${route.to}`}
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div className="ml-4">
                <h4 className="font-bold text-lg">
                  {route.from} → {route.to}
                </h4>

                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600">
                    <i className="fas fa-clock mr-1"></i>
                    {route.time}
                  </span>

                  <span className="mx-2">•</span>

                  <span className="text-sm text-gray-600">
                    {route.fare}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onPlanRoute(route)}
              className="text-primary font-medium hover:text-secondary"
            >
              Plan this route →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
