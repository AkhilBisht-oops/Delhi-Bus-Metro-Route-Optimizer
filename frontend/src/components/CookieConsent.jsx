import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(true);

  // 🔹 Check cookie/localStorage on load
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setVisible(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">
            We use cookies to improve your experience and provide personalized
            route suggestions. By continuing, you agree to our{" "}
            <a
              href="#"
              className="text-primary hover:underline"
            >
              Cookie Policy
            </a>.
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            Reject
          </button>

          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-primary rounded-lg hover:bg-secondary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}