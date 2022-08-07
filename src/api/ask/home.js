import request from '../request'

// 获取轮播图数据
function getBannerList () {
    return request({
        method:'get',
        url:'/home/getBannerList'
    })
}

// 获取列表数据
function getListData () {
    return request({
        method:'get',
        url:'/home/getListData'
    })
}

export default {
    getBannerList,
    getListData
}