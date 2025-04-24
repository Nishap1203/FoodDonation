import axios from "axios";

export const getLatLngFromAddress = async (address: string): Promise<{ latitude: number; longitude: number } | null> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; 

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: address,
        key: apiKey,
      },
    });

    const data = response.data;
    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return null;
  }
};
