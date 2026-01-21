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
import LiveMap from "./components/LiveMap";


export default function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [mapRoutes, setMapRoutes] = useState([]);


  const fareRef = useRef(null);

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
    setTimeout(() => setLoading(false), 1200);
  };

  const selectRoute = (route) => {
    setSelectedRoute(route);

    requestAnimationFrame(() => {
      fareRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100">
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

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Routes */}
        <Routes
          selectedRoute={selectedRoute}
          onSelectRoute={selectRoute}
          onRoutesLoaded={setMapRoutes}
        />
        {selectedRoute && (
          <LiveMap route={selectedRoute} />
        )}

        {/* Fare Calculator */}
        <div ref={fareRef} id="fare-calculator">
          <FareCalculator selectedRoute={selectedRoute} />
        </div>

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
