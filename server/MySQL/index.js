// 引入mysql模块
const mysql = require('mysql')

// 建立与 MySQL 数据库的连接
const db = mysql.createPool({
    host:'127.0.0.1', // 数据库服务器地址
    user:'root', // 登录数据库的账号
    password:'123456', // 登录数据库的密码
    database:'personal_blog' // 指定要操作哪个数据库
})

module.exports = db