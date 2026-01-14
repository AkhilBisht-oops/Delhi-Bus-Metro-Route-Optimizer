import { useEffect, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Routes from "./components/Routes";
import Features from "./components/Features";
import MetroLines from "./components/MetroLines";
import PopularRoutes from "./components/PopularRoutes";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

export default function App() {
  // 🔹 Shared state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // 🔹 Set current time (replaces old JS function)
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setTime(now);
  }, []);

  // 🔹 Find route logic
  const findRoute = () => {
    if (!from || !to) {
      alert("Please enter both starting point and destination");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSelectedRoute(1); // auto-select first route
    }, 1500);
  };

  // 🔹 Route selection
  const selectRoute = (route) => {
    setSelectedRoute(route.id);
    alert(
      `Selected: ${route.title}\nTime: ${route.time} mins\nFare: ₹${route.fare}`
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <Hero
        from={from}
        to={to}
        time={time}
        setFrom={setFrom}
        setTo={setTo}
        setTime={setTime}
        onFindRoute={findRoute}
        loading={loading}
      />

      <main className="container mx-auto px-4 py-12 space-y-12">
        <Routes
          selectedRoute={selectedRoute}
          onSelectRoute={selectRoute}
        />

        <Features />
        <MetroLines />

        <PopularRoutes
          onPlanRoute={(route) => {
            setFrom(route.from);
            setTo(route.to);
            findRoute();
          }}
        />
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}
