const express = require('express')

const router = express.Router()

const toolSharingHander = require('../router_hander/toolSharing')

// 获取数据
router.get('/getToolSharing',toolSharingHander.getToolSharing)

module.exports = router