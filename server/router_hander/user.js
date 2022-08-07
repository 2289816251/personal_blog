const sql = require('../MySQL/sql/user')
const db = require('../MySQL/index')
// 引入加密密码的模块
const bcryptjs = require('bcryptjs')
// 引入 加密token
const JWT = require('jsonwebtoken')
// 引入加密解密密钥
const config = require('../config')

// 添加uuid
function addUuid(req,res){

    // 拿其他信息
    const otherInfo = req.params.otherInfo

    // 先查询数据中有多少条数据
    db.query(sql.queryUsers(),(err,data)=>{
        if(err) return res.cc(err)
        let result = data.length + 1

        // 创建uuid
        let uuid = zeroPadding(result)
    
        // 插入数据
        db.query(sql.addUuid(uuid,otherInfo),(err,data)=>{
            if(err) return res.cc(err)
            res.send({
                code:200,
                data:{
                    uuid,
                    otherInfo
                }
            })
        })
    })
}
// 注册
function register(req,res){
    const uuid = req.params.uuid
    const {username,password} = req.body
    // 判断用户名是否存在
    db.query(sql.queryField('username',username),(err,data)=>{
        if(err) return res.cc(err)
        if(data.length > 0) return res.cc('用户名已存在')
        // 如果用户名没被注册 则加密密码
        const salt = bcryptjs.genSaltSync(10)
        const newPassword = bcryptjs.hashSync(password,salt)
        // 存储数据
        db.query(sql.register(uuid),{username,password:newPassword},(err,data)=>{
            if(err) return res.cc(err)
            res.send({
                code:200,
                msg:'注册成功',
                data
            })
        })
    })
}

// 登录
function login(req,res){
    const {username,password} = req.body
    // 判断用户名是否存在
    db.query(sql.queryFieldAll('username',username),(err,data)=>{
        if(err) return res.cc(err)
        if(data.length <= 0) return res.cc('用户名不存在')
        // 判断密码是否正确
        const compareResult = bcryptjs.compareSync(password,data[0].password)
        if(!compareResult) return res.cc('密码错误')
        // 解构数据
        const {username,uuid,otherInfo,imgUrl} = data[0]

        // 准备修改数据
        const value = {
            status:1
        }
        // 修改状态
        db.query(sql.login(uuid),value,(err,result)=>{
            if(err) return res.cc(err)
            // 生成token
            const token = JWT.sign({username,uuid,otherInfo,imgUrl},config.secretKey,{expiresIn:config.time})
            res.send({
                code:200,
                msg:'登录成功',
                token: 'Bearer ' + token
            })
        })
    })
}

// 登出
function logout(req,res){
    // 拿到uuid
    const uuid = req.params.uuid
    // 准备修改数据
    const data = {
        status:2
    }
    // 修改状态
    db.query(sql.logout(uuid),data,(err,data)=>{
        if(err) return res.cc(err)
        res.send({
            code:200,
            msg:'退出登录成功'
        })
    })
}

module.exports = {
    addUuid,
    register,
    login,
    logout
}

// 补零
function zeroPadding(num){
    // 原来的长度
    const numLength = num.toString().length
    // 补零后的长度
    const zeroLength = 10 - numLength
    // 补零
    let zero = ''
    for(let i = 0;i<zeroLength;i++){
        zero += '0'
    }
    
    return zero + num
}