const express = require("express");
const carRouter = require("./cars/cars-router");
const server = express();
server.use(express.json());
server.use("/api/cars", carRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

module.exports = server;
