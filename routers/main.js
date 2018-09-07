var express = require("express");
var router = express.Router();

router.get("/", (req, res, next)=>{
    res.render("main/home", {
        userInfo: req.userInfo
    })
})

router.get("/login", (req, res, next)=>{
    res.render("main/index")
})
module.exports = router;