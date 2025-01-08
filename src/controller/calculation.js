import axios from "axios";

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;
if (!OPENCAGE_API_KEY) {
  throw new Error(
    "Missing OpenCage API Key. Please set OPENCAGE_API_KEY in your environment."
  );
}

export const getCoordinates = async (location) => {
  if (!location) {
    throw new Error("Location is required.");
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    location
  )}&key=${OPENCAGE_API_KEY}`;

  try {
    const axiosInstance = axios.create({
      baseURL: "https://api.opencagedata.com/geocode/v1/json",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await axiosInstance.get(url);
    const results = response?.data?.results;

    if (Array.isArray(results) && results.length > 0) {
      const { lat, lng } = results[0]?.geometry || {};
      if (lat !== undefined && lng !== undefined) {
        return { lat, lng };
      }
    }

    throw new Error(`Location "${location}" not found.`);
  } catch (error) {
    if (error.response) {
      console.error(
        `API Error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
      throw new Error("Failed to fetch location data. Please try again later.");
    } else if (error.request) {
      console.error("Network Error: No response received from the API.");
      throw new Error("Network error occurred while fetching location data.");
    } else {
      console.error(`Unexpected Error: ${error.message}`);
      throw new Error("An unexpected error occurred. Please contact support.");
    }
  }
};
