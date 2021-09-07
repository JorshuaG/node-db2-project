const express = require("express");
const Cars = require("./cars-model");
const router = express.Router();
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const all = await Cars.getAll();
    res.json(all);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCarId, (req, res) => {
  res.json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Something went wrong, try using 42",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
