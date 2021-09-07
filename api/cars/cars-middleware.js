const Cars = require("./cars-model");
const vinValidator = require("vin-validator");
// var isValidVin = vinValidator.validate('11111111111111111'); // true

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      res
        .status(404)
        .json({ message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    next({ status: 400, message: "vin is missing" });
  } else if (!make) {
    next({ status: 400, message: "make is missing" });
  } else if (!model) {
    next({ status: 400, message: "model is missing" });
  } else if (!mileage) {
    next({ status: 400, message: "mileage is missing" });
  }
  next();
};

const checkVinNumberValid = async (req, res, next) => {
  const isValidVin = await vinValidator.validate(req.body.vin);
  if (isValidVin === false) {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  }
  next();
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const exists = await Cars.getByVin(req.body.vin);

    if (exists) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
