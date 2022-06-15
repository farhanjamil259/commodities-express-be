const createRequestTime = (req, _res, next) => {
  req.requestTime = new Date().toISOString();

  next();
};

export default createRequestTime;
