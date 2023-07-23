const express = require("express");
const router = express.Router();
const vehicleControllers = require('../controllers/vehicleControllers')

router.get('/search', vehicleControllers.Search)
router.get('/getall', vehicleControllers.GetAll)
router.patch('/checkin', vehicleControllers.CheckIn)
router.patch('/checkout', vehicleControllers.CheckOut)
router.patch('/fuelcharge', vehicleControllers.FuelCharge)
router.patch('/changeoil', vehicleControllers.ChangeOil)
router.patch('/washing', vehicleControllers.Washing)

module.exports = router;
