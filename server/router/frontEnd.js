const express = require('express')

const router = express.Router()

const frontEndHander = require('../router_hander/frontEnd')

// 获取通过关键字获取文章数据
router.get('/getFrontEndData/:key/:sort/:page',frontEndHander.getFrontEndData)

module.exports = router