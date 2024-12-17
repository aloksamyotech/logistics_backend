// controllers/distanceController.js

import axios from "axios";
import { getCoordinates } from "./calculation.js";

// OpenRouteService API Key (replace with your own)
const OPENROUTESERVICE_API_KEY =
  "5b3ce3597851110001cf6248693f149878494357870268609ae029ec";

// Function to get route distance using OpenRouteService API
const getRouteDistance = async (from, to, mode = "driving-car") => {
  try {
    // Get coordinates for both the 'from' and 'to' locations
    const fromCoords = await getCoordinates(from);
    const toCoords = await getCoordinates(to);
    console.log("from distance", fromCoords);
    console.log("to location", toCoords);

    // OpenRouteService API URL for route calculation
    const url = `https://api.openrouteservice.org/v2/directions/${mode}?api_key=${OPENROUTESERVICE_API_KEY}`;

    // Prepare the coordinates for the API request
    const body = {
      coordinates: [
        [fromCoords.lng, fromCoords.lat], // [longitude, latitude]
        [toCoords.lng, toCoords.lat],
      ],
    };

    // Make a POST request to the OpenRouteService API
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    // Extract the distance from the response data
    if (response.data.routes && response.data.routes[0]) {
      const route = response.data.routes[0];
      const distance = route.summary.distance; // Distance in meters
      const distanceInKilometers = distance / 1000;
      console.log("distance which is coming", distanceInKilometers, distance);
      // Convert to kilometers
      const distanceInMiles = distanceInKilometers * 0.621371; // Convert to miles

      return { distanceInKilometers, distanceInMiles };
    } else {
      throw new Error("Unable to calculate route distance.");
    }
  } catch (error) {
    console.error("Error fetching route distance:", error.message);
    throw new Error("Unable to calculate route distance.");
  }
};

// Controller function for calculating the distance
const calculateDistance = async (req, res) => {
  const { from, to, mode } = req.body;
  try {
    const distance = await getRouteDistance(from, to, mode || "driving-car");
    console.log("distance is ====>", distance);

    res.json(distance); // Send the calculated distance in kilometers and miles
  } catch (error) {
    res.status(500).json({ error: "Unable to calculate distance" });
  }
};

export { calculateDistance };
