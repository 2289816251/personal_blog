const sql = require('../MySQL/sql/music')
const db = require('../MySQL/index')

const banner =  require('../json/banner.json')
const list = require('../json/homeListData.json')

// 获取首页轮播图数据
function getBannerList(req,res){
    res.send({
        code:200,
        data:banner
    })
}

// 获取列表数据
function getListData(req,res){
    res.send({
        code:200,
        data:list
    })
}

module.exports = {
    getBannerList,
    getListData
}