import axios from "axios";

const OPENCAGE_API_KEY = "49760cf79bfa4dbc81f34bcf440d3373"; // Replace with your API Key

export const getCoordinates = async (location) => {
  if (!location) {
    throw new Error("Location is required.");
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    location
  )}&key=${OPENCAGE_API_KEY}`;

  try {
    const response = await axios.get(url);

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      console.log(`Coordinates for ${location}:`, { lat, lng });
      return { lat, lng };
    } else {
      throw new Error(`Location "${location}" not found.`);
    }
  } catch (error) {
    console.error("Error in getCoordinates:", error.message);
    throw new Error("Unable to fetch coordinates from OpenCage API.");
  }
};
