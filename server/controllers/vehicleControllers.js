const Db = require('../db/conn')

const CalculateTotalCost = async (vehicle) => {
    const ServicePrice = await (await Db.connect()).collection('ServicePrice').findOne({ name: 'myprice' })
    const checkin = vehicle.checkin ? new Date(vehicle.checkin).getTime() : undefined;
    const checkout = vehicle.checkout ? new Date(vehicle.checkout).getTime() : undefined;
    const diff = checkin && checkout ? Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24)) : 0;
    const vehicleType = vehicle.type?.replace(/\s/g,'').toLowerCase()
    const unitParkingPrice = vehicleType ? ServicePrice[vehicleType] : 0;
    const parkingCost = diff * unitParkingPrice
    const fuelType = vehicle.fuel ? vehicle.fuel.type.toLowerCase() : undefined
    const unitFuelPrice = fuelType ? ServicePrice[fuelType] : 0
    const fuelCost = vehicle.fuel ? parseInt(vehicle.fuel.amount) * unitFuelPrice : 0
    const changeOilCost = vehicle.changeoil ? ServicePrice['changeoil'] : 0;
    const washingCost = vehicle.washing ? ServicePrice['washing'] : 0;
    const totalCost = parkingCost + fuelCost + changeOilCost + washingCost;
    await (await Db.connect())
    .collection('Vehicle')
    .updateOne(
        { vehicleid: vehicle.vehicleid },
        {
            $set: {
                cost: parseFloat(totalCost).toFixed(2)
            }
        }
    )
}

module.exports = {
    Search: async (req, res) => {
        try {
            const queryResult = await (await Db.connect()).collection('Vehicle').find({}).toArray()
            const result = queryResult.filter((vehicle) => {
                return vehicle.vehicleid.toLowerCase().includes(req.query.keyword)
            })
            return res.status(200).send(result)
        } catch (err) {
            return res.status(500).send('Server Error');
        }
    },

    GetAll: async (req, res) => {
        try {
            const result = await (await Db.connect()).collection('Vehicle').find({}).toArray()
            return res.status(200).send(result)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    },

    CheckIn: async (req, res) => {
        try {
            const { vehicleid: vehicleid_req, type: type_req } = req.body;
            await (await Db.connect())
            .collection('Vehicle')
            .updateOne(
                { vehicleid: vehicleid_req },
                {
                    $set: {
                        type: type_req,
                        checkin: new Date()
                    },
                },
                {
                    upsert: true,
                }
            )
            return res.status(201).send('Successfully updated');
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    },

    CheckOut: async (req, res) => {
        try {
            const { vehicleid: vehicleid_req } = req.body;
            const vehicleRecord = await (await Db.connect()).collection('Vehicle').findOne({ vehicleid: vehicleid_req })
            if (vehicleRecord.checkin === undefined) {
                return res.status(400).send('Something when wrong');
            }
            await (await Db.connect())
            .collection('Vehicle')
            .updateOne(
                { vehicleid: vehicleid_req },
                {
                    $set: {
                        checkout: new Date()
                    }
                }
            )
            const vehicle = await (await Db.connect()).collection('Vehicle').findOne({ vehicleid: vehicleid_req })
            await CalculateTotalCost(vehicle)
            return res.status(201).send('Successfully updated');
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    },

    FuelCharge: async (req, res) => {
        try {
            const { vehicleid: vehicleid_req, fuel: fuel_req } = req.body;
            await (await Db.connect())
            .collection('Vehicle')
            .updateOne(
                { vehicleid: vehicleid_req },
                {
                    $set: {
                        fuel : {
                            type: fuel_req.type,
                            amount: fuel_req.amount
                        }
                    }
                },
                {
                    upsert: true
                }
            )
            const vehicle = await (await Db.connect()).collection('Vehicle').findOne({ vehicleid: vehicleid_req })
            await CalculateTotalCost(vehicle)
            return res.status(201).send('Successfully updated');
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    },

    ChangeOil: async (req, res) => {
        try {
            const { vehicleid: vehicleid_req } = req.body;
            await (await Db.connect())
            .collection('Vehicle')
            .updateOne(
                { vehicleid: vehicleid_req },
                {
                    $set: {
                        changeoil: true
                    }
                },
                {
                    upsert: true
                }
            )
            const vehicle = await (await Db.connect()).collection('Vehicle').findOne({ vehicleid: vehicleid_req })
            await CalculateTotalCost(vehicle)
            return res.status(201).send('Successfully updated');
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    },

    Washing: async (req, res) => {
        try {
            const { vehicleid: vehicleid_req } = req.body;
            await (await Db.connect())
            .collection('Vehicle')
            .updateOne(
                { vehicleid: vehicleid_req },
                {
                    $set: {
                        washing: true
                    }
                },
                {
                    upsert: true
                }
            )
            const vehicle = await (await Db.connect()).collection('Vehicle').findOne({ vehicleid: vehicleid_req })
            await CalculateTotalCost(vehicle)
            return res.status(201).send('Successfully updated');
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
}
