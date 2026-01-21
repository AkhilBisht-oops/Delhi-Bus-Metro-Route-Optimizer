import L from "leaflet";

export const userIcon = new L.Icon({
  iconUrl: "/src/assets/map-icons/user.png",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export const metroIcon = new L.Icon({
  iconUrl: "/src/assets/map-icons/metro.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const busIcon = new L.Icon({
  iconUrl: "/src/assets/map-icons/bus.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const destinationIcon = new L.Icon({
  iconUrl: "/src/assets/map-icons/destination.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
