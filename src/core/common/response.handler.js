export const sendResponse = (res, statusCode, data = null, error = null) => {
  statusCode = statusCode || 200;
  if (error) {
    res.status(statusCode).json({
      success: false,
      error: {
        message: error.message || "Internal  Server Error",
        ...error,
      },
    });
  } else {
    res.status(statusCode).json({
      success: true,
      data,
    });
  }
};
