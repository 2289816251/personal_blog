const express = require('express')

const router = express.Router()

const indexHander = require('../router_hander/index')

// 获取友链数据
router.get('/getFriendsChain',indexHander.getFriendsChain)

// 获取推荐文章数据
router.get('/getArticle',indexHander.getArticle)

// 通过搜索关键词获取数据
router.get('/getArticleBySearch/:keyword/:page',indexHander.getArticleBySearch)

module.exports = router