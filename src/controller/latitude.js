const latitude = async (req, res) => {
  try {
    const { from, to } = req.params.body;
    console.log(from.req.body);

    if (!from || !to) {
      console.log("Error: Missing 'from' or 'to' in body.");
      return res.status(400).json({
        error: "'from' and 'to' in request body are required.",
      });
    }

    console.log("Received body data:", { from, to });

    const result = await QuoteDetailsModel.findOne({ from, to });

    if (result) {
      console.log("Found result:", result);
      return res.status(200).json({
        from: {
          city: result.from,
          latitude: result.fromLatitude,
          longitude: result.fromLongitude,
        },
        to: {
          city: result.to,
          latitude: result.toLatitude,
          longitude: result.toLongitude,
        },
      });
    } else {
      return res.status(404).json({
        error: `No data found for 'from': ${from} and 'to': ${to}.`,
      });
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return res.status(500).json({
      error: "An error occurred while fetching coordinates.",
    });
  }
};
export default latitude;
