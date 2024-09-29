const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    console.log("---Logged in user details---",req.user);
    res.status(200).json([
        {
            name:"mobile",
            price:100000
        },
        {
            name:"tv",
            price:200000
        }
    ])
});

module.exports = router;