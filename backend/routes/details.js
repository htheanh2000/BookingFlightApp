const router = require('express').Router();
let Detail = require('../models/details.model');

router.route('/').get((req, res) => {
    Detail.find()
        .then(details => res.json(details))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const detailID = req.body.detailID;
    const billID = req.body.billID;
    const flightID = req.body.flightID;
    const num = Number(req.body.num);
    const billCost = Number(req.body.billCost);

    const newDetail = new Detail({
        detailID, billCost, billID, num, flightID
    })
    newDetail.save()
        .then(() => res.json('Detail added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;