const express = require('express')

const router = express.Router()

const musicHander = require('../router_hander/music')

router.get('/getMusicList',musicHander.getMusicLisr)

module.exports = router