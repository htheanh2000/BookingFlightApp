const router = require('express').Router();
let User =  require('../models/user.model');

router.route('/').get((req,res)=> {
    User.find()
    .then( users => res.json(users))
    .catch( err => res.status(400).json('Error: ' + err))
});
router.route('/:id').get((req,res)=> {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => err.status(400).json('Error: '+ err))
})

router.route('/add').post((req,res) => {
    const userID = req.body.userID;
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userBday = Date.parse(req.body.userBday);
    const userPhoneNum = req.body.userPhoneNum;    

    const newUser = new User({
        userID,
        userName,
        userEmail,
        userBday,
        userPhoneNum,
    })

    newUser.save()
    .then(()=> res.json('User added'))
    .catch(err=> res.status(400).json('Error: '+ err))
})

module.exports = router;