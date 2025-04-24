import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import { useQuery } from "@apollo/client";
import { GET_NEAREST_NGO } from "../../graphql/queries";
import { toast } from "react-toastify";
import usermarker from "../../assets/usermarker.png";
import ngomarker from "../../assets/ngomarker.png";

// Fix Leaflet marker issue in Webpack projects
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Set default icon for markers
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: usermarker,
  shadowUrl: markerShadow,
});

// Define NGO Type
interface NGO {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// Component
const NearbyNGOMap = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [radius, setRadius] = useState(10);

  // Fetch user's location
  useEffect(() => {
    const fetchLocation = () => {
      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User Location:", latitude, longitude);
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Please enable location to find nearby NGOs.");
        }
      );
    };

    fetchLocation();
  }, []);

  // Fetch approved NGOs from GraphQL API
  const { data, loading, error, refetch } = useQuery(GET_NEAREST_NGO, {
    variables: {
      lat: location?.lat || 0,
      long: location?.lng || 0,
      radius: radius,
    },
    skip: !location, // Skip query execution if location is not available
  });

  useEffect(() => {
    if (location) {
      refetch(); // Refetch data when location is available
    }
  }, [location, radius, refetch]);

  if (error) {
    console.error("Error fetching NGOs:", error);
    toast.error("Failed to fetch nearby NGOs.");
  }

  // Custom Icons
  const userIcon = new L.Icon({
    iconUrl: usermarker,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -40],
    shadowUrl: markerShadow,
  });

  const ngoIcon = new L.Icon({
    iconUrl: ngomarker,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -40],
    shadowUrl: markerShadow,
  });

  // Handle radius change
  const handleRadiusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRadius = parseInt(event.target.value, 10);
    setRadius(newRadius);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Nearby Approved NGOs
      </h1>

      {/* Radius Filter */}
      <div className="mb-4 text-center">
        <label className="mr-2 font-semibold text-xl">Search Radius:</label>
        <select
          value={radius}
          onChange={handleRadiusChange}
          className="p-2 border rounded-md"
        >
          <option value="5">1 km</option>
          <option value="10">10 km</option>
          <option value="20">20 km</option>
          <option value="50">50 km</option>
        </select>
      </div>

      {loading && <p className="text-center">Loading nearby NGOs...</p>}
      {error && (
        <p className="text-center text-red-500">Failed to load NGOs.</p>
      )}

      {!location && (
        <p className="text-center">
          Please enable location access to find NGOs near you.
        </p>
      )}

      {location && data && (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={13}
          className="h-[500px] w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User's Location */}
          <Marker position={[location.lat, location.lng]} icon={userIcon}>
            <Popup>
              <strong>Your Location</strong>
            </Popup>
          </Marker>

          {/* Display Approved NGOs */}
          {data?.getNearestNGO?.NGOs?.length ? (
            data.getNearestNGO.NGOs.map((ngo: NGO, index: number) => (
              <Marker
                key={ngo.id || `ngo-${index}`}
                position={[ngo.latitude, ngo.longitude]}
                icon={ngoIcon}
              >
                <Popup>
                  <strong>{ngo.name}</strong> <br />
                  📍 {ngo.address}
                </Popup>
              </Marker>
            ))
          ) : (
            <p className="text-center">No approved NGOs found nearby.</p>
          )}
        </MapContainer>
      )}

      {!data?.getNearestNGO ||
        (!data.getNearestNGO.NGOs?.length && (
          <p className="text-center">No approved NGOs found nearby.</p>
        ))}
    </div>
  );
};

export default NearbyNGOMap;
