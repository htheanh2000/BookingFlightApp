const router = require('express').Router();
let Flight = require('../models/flight.model');

router.route('/').get((req,res) => {
    Flight.find()
    .then( flights => res.json(flights))
    .catch( err => res.status(400).json('Error: ' + err));

}) ;
router.route('/:id').get((req,res)=> {
    Flight.findById(req.params.id)
    .then(flight => res.json(flight))
    .catch(err => res.status(400).json('Error: ' + err));
}) 

router.route('/add').post((req,res) => {
   
        const flightID = req.body.flightID;
        const flightName = req.body.flightName;
        const departureDate = Date.parse(req.body.departureDate);
        const flightTime = Number(req.body.flightTime);
        const arrivalLocation = req.body.arrivalLocation;
        const departureLocation = req.body.departureLocation;
        const airfares = Number(req.body.airfares);
        
        const newFlight = new Flight({
            flightID,
            flightName,
            departureDate,
            flightTime,
            arrivalLocation,
            departureLocation,
            airfares,
        });
    
        newFlight.save()
        .then(() => res.json('Flight added'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
   


router.route('/search').post((req,res)=>{
    Flight.find(
        {
         departureDate:  req.body.departureDate.toString() ,
         arrivalLocation :req.body.arrivalLocation,
         departureLocation: req.body.departureLocation,
         //slot : {$lte: 10}
        }
    )
   .then( flight => res.json(flight))
   .catch(err => res.status(400).json('Error: ' + err))

   
})
router.route('/update/:id').post((req,res)=> {
    Flight.findByIdAndUpdate(req.params.id,{ slot: Number(req.body.slot) })
    .then( () => res.json("Update sucessfull"))
    .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router;