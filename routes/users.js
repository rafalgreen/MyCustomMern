var express = require('express');
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/demo')
var router = express.Router();

var User = mongoose.model('users', {
    login: String,
    profile: String
})

router.get('/', (req, res, next) => {
    User.find({}, null, {sort: {_id: -1}}, (error, user) => {
        if (error) return next(error)
        res.json(user)
    })
});

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id, (error, user) => {
        if (error) return next(error)
        res.json(user)
    })
});

router.get('/login/:login', (req, res, next) => {
    User.findByLogin(req.params.login, (error, user) => {
        if (error) return next(error)
        res.json(user)
    })
});


router.post('/', (req, res)=>{
    var user = new User()
    user.login = req.body.login
    user.profile = "LIGHT"
    user.save((err)=>{
        if(err) res.send(err)

        res.json(user)
    })

})


module.exports = router;
