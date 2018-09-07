const express =  require("express");
const router = express.Router();
const User = require("../models/User");

// 统一返回格式
var responseData;
router.use( function (req, res, next){
    responseData = {
        code: 0,
        message: ""
    };
    next();
})
/**
 * 用户注册
 *  注册逻辑
 *  1. 用户名不能为空
 *  2.密码不能为空
 *  3.两次输入密码必须一致
 * 
 * 数据库查询
 * 1.用户是否已经注册
 */
router.post("/user/register", (req, res, next)=>{
   
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    User.findOne({
        username: username
    }).then((userInfo)=>{
        console.log(userInfo)
        if( userInfo){
            responseData.code = 4;
            responseData.message = "用户名被注册";
            res.json(responseData);
            return;
        }
        // create 向数据库插入数据
        return User.create({
            username: username,
            password: password
        }).then((newUserInfo) =>{
            responseData.code="OK";
            responseData.message="注册成功";
            res.json(responseData);
        });
    })
})


// 登录
router.post("/user/login", (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    if(username == "" || password == ""){
        responseData.code = 1;
        responseData.message = "用户名和密码不能为空"
        res.json(responseData);
        return;
    }
    
    // 查询数据库 是否存在 账号
    User.findOne({
        username: username,
        password: password
    }).then( (userInfo)=>{
        console.log(userInfo)
        if(!userInfo){
            responseData.code = 2;
            responseData.message = "用户名或密码错误";
            res.json(responseData);
            return;
        }
        responseData.code = 3;
        responseData.message = "登录成功";
        responseData.username = userInfo.username;
        responseData.id = userInfo._id;
        req.cookies.set("userInfo", JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }),{
            httpOnly: false
        })
        res.json(responseData);
    })
    
})

module.exports = router;