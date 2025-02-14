import axios from "axios";
import { getCoordinates } from "./calculation.js";

const OPENROUTESERVICE_API_KEY =
  "5b3ce3597851110001cf6248693f149878494357870268609ae029ec";

export const getRouteDistance = async (from, to, mode = "driving-car") => {
  try {
    const fromCoords = await getCoordinates(from);
    const toCoords = await getCoordinates(to);

    const url = `https://api.openrouteservice.org/v2/directions/${mode}?api_key=${OPENROUTESERVICE_API_KEY}`;

    const body = {
      coordinates: [
        [fromCoords?.lng, fromCoords?.lat],
        [toCoords?.lng, toCoords?.lat],
      ],
    };

    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    const route = response?.data?.routes?.[0];
    if (route) {
      const distance = route?.summary?.distance;
      const distanceInKilometers = distance / 1000;
      const distanceInMiles = distanceInKilometers * 0.621371;

      return { distanceInKilometers, distanceInMiles };
    } else {
      throw new Error("Unable to calculate route distance.");
    }
  } catch (error) {
    console.error("Error fetching route distance:", error?.message);
    throw new Error("Unable to calculate route distance.");
  }
};

const calculateDistance = async (req, res) => {
  const { from, to, mode } = req.body;
  try {
    const distance = await getRouteDistance(from, to, mode || "driving-car");
    res.json(distance);
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || "Unable to calculate distance" });
  }
};

export { calculateDistance };
