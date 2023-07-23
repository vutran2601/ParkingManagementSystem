const express = require("express");
const router = express.Router();
const priceControllers = require("../controllers/priceControllers");

// Router for price management
router.get('/getall', priceControllers.GetAll)
router.patch('/changeprice', priceControllers.ChangePrice)

module.exports = router;
