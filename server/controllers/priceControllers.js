const Db = require('../db/conn')

module.exports = {
    GetAll: async (req, res) => {
        try {
            const result = await (await Db.connect()).collection('ServicePrice').find({}).toArray()
            return res.status(200).send(result)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    },

    ChangePrice: async (req, res) => {
        try {
            const { price: price_req } = req.body;
            await (await Db.connect())
            .collection('ServicePrice')
            .updateOne(
                { name: 'myprice' },
                {
                    $set: {
                        '4seater': price_req['4seater'],
                        '7seater': price_req['7seater'],
                        'truck': price_req['truck'],
                        'gasoline': price_req['gasoline'],
                        'diesel': price_req['diesel'],
                        'changeoil': price_req['changeoil'],
                        'washing': price_req['washing'],
                    },
                },
                {
                    upsert: 'true'
                }
            )
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    },

}