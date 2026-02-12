import L from "leaflet";

// ✅ IMPORT images (Vite way)
import busPng from "../assets/map-icons/bus.png";
import metroPng from "../assets/map-icons/metro.png";
import userPng from "../assets/map-icons/user.png";
import destinationPng from "../assets/map-icons/destination.png";

export const busIcon = new L.Icon({
  iconUrl: busPng,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

export const metroIcon = new L.Icon({
  iconUrl: metroPng,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

export const userIcon = new L.Icon({
  iconUrl: userPng,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export const destinationIcon = new L.Icon({
  iconUrl: destinationPng,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});
