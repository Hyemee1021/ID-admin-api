//object

export const responder = {
  SUCCESS: ({ res, message, errorCode = 200 }) => {
    res.status(errorCode).json({
      status: "success",
      message,
    });
  },
  //why error code is 2oo even its error
  ERROR: ({ res, message, errorCode = 200 }) => {
    res.status(errorCode).json({
      status: "error",
      message,
    });
  },
};
