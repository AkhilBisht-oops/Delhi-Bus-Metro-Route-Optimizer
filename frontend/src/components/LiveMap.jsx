import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { userIcon, metroIcon, busIcon, destinationIcon } from "../utils/mapIcons";

export default function LiveMap({ route }) {
  if (!route) return null;

  const stops = route.stops.map(
    (s) => [s.location.coordinates[1], s.location.coordinates[0]]
  );

  return (
    <div className="h-[500px] rounded-xl overflow-hidden border border-gray-800">
      <MapContainer
        center={stops[0]}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        {/* Google-like map tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route line */}
        <Polyline
          positions={stops}
          pathOptions={{ color: route.color || "#2563eb", weight: 5 }}
        />

        {/* Stops */}
        {route.stops.map((stop, i) => (
          <Marker
            key={i}
            position={[
              stop.location.coordinates[1],
              stop.location.coordinates[0],
            ]}
            icon={route.type === "metro" ? metroIcon : busIcon}
          >
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}

        {/* Destination */}
        <Marker position={stops[stops.length - 1]} icon={destinationIcon}>
          <Popup>{route.destination}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
