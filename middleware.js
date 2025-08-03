function setCurrentYear(req, res, next) {
  res.locals.currentYear = new Date().getFullYear();
  next();
}

export const middleware = [
  setCurrentYear,
];
