export const successResponse = (res, statusCode, message, data = {}, meta = undefined) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta && { meta })
  });
};

export const errorResponse = (res, statusCode, message, errors = undefined, requestId = undefined) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(requestId && { requestId })
  });
};
