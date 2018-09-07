const mongoose = require("mongoose");
var usersSchema = require("../schemas/users.js");

// 创建模型类 暴露
module.exports = mongoose.model("User", usersSchema);