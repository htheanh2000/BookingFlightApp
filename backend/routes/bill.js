const router = require('express').Router();
let Bill = require('../models/bill.model');


router.route('/').get((req,res)=>{
    Bill.find()
    .then(bills => res.json(bills))
    .catch( err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req,res)=> {
    const billID = req.body.billID;
    const userID = req.body.userID;
    const billCost = req.body.billCost;
    const dPurchase = req.body.dPurchase;

    const newBill = new Bill({
        billID,
        userID,
        billCost,
        dPurchase
    });
    newBill.save()
    .then(() => res.json('Bill added'))
    .catch(() => res.status(400).json('Error:' + err))
})

module.exports = router;