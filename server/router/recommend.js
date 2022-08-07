const express = require('express')

const router = express.Router()

const recommendHander = require('../router_hander/recommend')

// 获取数据
router.get('/getRecommend/:page?',recommendHander.getRecommend)
// 点赞
router.post('/like',recommendHander.like)

module.exports = router