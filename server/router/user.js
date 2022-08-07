const express = require('express')

const router = express.Router()

const userHander = require('../router_hander/user')

// 添加uuid
router.post('/addUuid/:otherInfo',userHander.addUuid)

// 注册
router.post('/register/:uuid',userHander.register)

// 登录
router.post('/login',userHander.login)

// 登出
router.post('/logout/:uuid',userHander.logout)

module.exports = router