import express from "express";

function setCurrentYear(req, res, next) {
  res.locals.currentYear = new Date().getFullYear();
  next();
}

export const middleware = [
  express.json(),
  setCurrentYear,
];
