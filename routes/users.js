const express = require('express');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/demo')
const router = express.Router();

const User = mongoose.model('users', {
    login: String,
    profile: String
})

router.all('/all',  (req, res, next) => {
    console.log('router all!!!!!!!!!!!!');
    next() // pass control to the next handler
    console.log('router all!!!!!!!!!!!!22222222');
});

router.get('/next', (req, res, next) => {
    console.log('the response will be sent by the next function ...');
    next()
}, function (req, res) {
    res.send('Hello from B!')
})

router.get('/a', (req, res, next) => {
    var query = User.find({ login: /2222/i }, null, {sort: {_id: -1}});
    var promise = query.exec();

    promise.addBack(function (err, docs) {
        res.status(200)
    });
});

router.get('/', (req, res, next) => {
    User.find({}, null, {sort: {_id: -1}}, (error, user) => {
        if (error) return next(error)
        res.status(200).json(user)
    })
});

router.get('/id/:id', (req, res, next) => {
    User.findById(req.params.id, (error, user) => {
        if (error) return next(error)
        res.status(200).json(user)
    })
});

router.delete('/id/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, user) => {
        if (error) return next(error)
        res.status(200).json(user)
    })
});

router.get('/login/:login', (req, res, next) => {
    User.find({login: req.params.login}, (error, user) => {
        if (error) return next(error)
        res.render('special')
        res.status(200)
    })
});




router.post('/', (req, res)=>{
    var user = new User()
    user.login = req.body.login
    user.profile = "LIGHT"
    user.save((err)=>{
        if(err) res.send(err)
        res.status(201)
    })
})

router.post('/login/:login/profile/:profile', (req, res)=>{
    var user = new User()
    user.login = req.params.login
    user.profile = req.params.profile
    user.save((err)=>{
        if(err) res.send(err)
    })
    res.status(201)
})

router.post('/login/:login/profile/:profile', (req, res)=>{
    var user = new User()
    user.login = req.params.login
    user.profile = req.params.profile
    user.save((err)=>{
        if(err) res.send(err)
    })
    res.status(201)
})

router.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Users Something broke!')
})
module.exports = router;
