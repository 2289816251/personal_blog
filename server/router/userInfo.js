const express = require('express')

const router = express.Router()

const userInfoHander = require('../router_hander/userInfo')

// 获取用户信息
router.get('/getUserInfo',userInfoHander.getUserInfo)

module.exports = router