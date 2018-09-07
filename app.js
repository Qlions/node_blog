/**
 * Created by john on 2018/09/05
 * 应用启动入口文件
 */

//  加载express
var express = require("express");

// 加载模板处理模块
const swig = require("swig");
// 加载mongo数据库
const mongoose = require("mongoose");
//加载 body-parser
const body_parser = require("body-parser");
//价值啊cookies模块
const Cookies = require("cookies"); 

// 创建app应用 =》 Nodejs Http.createServer()；
var app = express();

// 设置静态文件托管
// 当用户访问的url 以/public 开始， 那么直接返回对应 _dirname + /public 下的文件
app.use("/public", express.static(__dirname+ "/public"))

// 配置应用模板
// 定义当前应用所使用的模板引擎
// 第一个参数： 模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine("html", swig.renderFile)
// 设置模板文件存放的目录，第一个参数必须是views， 第二个参数是目录
app.set("views", "./views");
// 注册所使用的模板引擎， 第一个参数必须是 view  engine， 第二个参数和app.engine 这个方法重定义的模板引擎的名称（第一个参数）是一致的
app.set("view engine", "html")
// 在开发过程中， 需要取消模板缓存
swig.setDefaults({cache: false})

//  bodyparser 设置
app.use( body_parser.urlencoded({ extended: true }));

// 设置cookie
app.use( (req, res, next)=>{
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    //如果有userinfo 保存userinfo 
    if(req.cookies.get("userInfo")){
        try{
            req.userInfo = JSON.parse(req.cookies.get("userInfo"));
        }catch(err){
        }
    }
    
    next();
})
/**
 * 首页
 * req request 对象
 * res response 对象
 * next 函数
 */
// app.get("/", function (req, res, next){
    // res.send("<h1>欢迎1光临</h1>")

    /**
     * 读取views目录下的指定文件， 解析并返回给客户端
     * 第一个参数： 表示木板的文件。相对于views目录， views/index.html
     * 第二个参数： 传递给模板使用的数据
     */
//     res.render("index")
// })

/**
 * 根据不同的功能划分模块
 */
app.use("/admin", require("./routers/admin"));
app.use("/api", require("./routers/api"));
app.use("/", require("./routers/main"));

// 使用mongodb connect方法 链接 数据库
mongoose.connect("mongodb://localhost:27018/Blog", (err)=>{
    if(err){
        console.log("数据库连接失败")
    }else{
        console.log("数据库链接成功")
    
    // 监听http请求
    app.listen(3000)
    }

})
mongoose.Promise = global.Promise;


// 用户发送http请求-> url -> 解析路由 -> 找到匹配的规则 ->  执行指定的函数，返回对应内容至用户

// /public -> 静态文件 -> 直接读取指定目录下的文件，返回给用户
// -> 动态文件 -> 处理业务逻辑，加载模板，解析模板 -> 返回数据给用户