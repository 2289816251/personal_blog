const express = require('express')

const router = express.Router()

const aboutMeHander = require('../router_hander/aboutMe')

// 获取通过关键字获取文章数据
router.get('/getAboutMe',aboutMeHander.getAboutMe)

module.exports = router