import { useEffect, useState } from "react";

export default function Footer() {
  const [quickLinks, setQuickLinks] = useState([]);
  const [transportLinks, setTransportLinks] = useState([]);
  const [email, setEmail] = useState("");

  // 🔹 Load footer data (API-ready)
  useEffect(() => {
    setQuickLinks([
      "Metro Timings",
      "Bus Routes",
      "Fare Calculator",
      "Metro Map",
      "Mobile App",
    ]);

    setTransportLinks([
      "DMRC Official Site",
      "DTC Bus Services",
      "Cluster Bus Services",
      "Last Metro Timings",
      "First & Last Bus",
    ]);
  }, []);

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-subway text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Delhi Route Optimizer
                </h3>
                <p className="text-sm text-gray-400">
                  Smart Commute Planning
                </p>
              </div>
            </div>

            <p className="text-gray-400 mb-4">
              Your intelligent partner for navigating Delhi's public transport
              system efficiently.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Transport Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Transport Info</h4>
            <ul className="space-y-2">
              {transportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Get updates on route changes and new features
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow p-3 rounded-l-lg text-gray-900 outline-none"
              />
              <button
                onClick={handleSubscribe}
                className="bg-primary px-4 rounded-r-lg hover:bg-secondary"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>
            © 2024 Delhi Route Optimizer. All rights reserved. | Data provided by
            DMRC & DTC
          </p>
          <p className="mt-2 text-sm">
            This is a demonstration website for route optimization concepts.
          </p>
        </div>
      </div>
    </footer>
  );
}
