const express = require('express')

const router = express.Router()

const homeHander = require('../router_hander/home')

// 获取轮播图数据
router.get('/getBannerList',homeHander.getBannerList)
// 获取列表数据
router.get('/getListData',homeHander.getListData)

module.exports = router