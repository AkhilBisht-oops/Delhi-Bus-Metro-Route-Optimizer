import { useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Routes from "./components/Routes";
import Features from "./components/Features";
import MetroLines from "./components/MetroLines";
import FareCalculator from "./components/FareCalculator";
import PopularRoutes from "./components/PopularRoutes";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

export default function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const fareRef = useRef(null);

  // Set current time on load
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setTime(now);
  }, []);

  const findRoute = () => {
    if (!from || !to) {
      alert("Please enter both starting point and destination");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const selectRoute = (route) => {
    if (!route) return;

    setSelectedRoute(route);

    // Smooth scroll to fare calculator
    requestAnimationFrame(() => {
      fareRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors">
      <Header />

      {/* Home */}
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
        {/* Routes */}
        <section id="routes">
          <Routes
            selectedRoute={selectedRoute}
            onSelectRoute={selectRoute}
          />
        </section>

        {/* Fare Calculator */}
        <section id="fare-calculator" ref={fareRef}>
          <FareCalculator selectedRoute={selectedRoute} />
        </section>

        {/* Features */}
        <section id="features">
          <Features />
        </section>

        {/* Metro Map */}
        <section id="metro-map">
          <MetroLines />
        </section>

        {/* Popular Routes */}
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
