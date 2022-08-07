import request from '../request'

// 获取音乐列表
function getRecommendData(page){
    if(page){
        return request({
            method:'get',
            url:`/recommend/getRecommend/${page}`
        })
    }else{
        return request({
            method:'get',
            url:`/recommend/getRecommend`
        })
    }
}

// 点赞
function like(id,if_like){
    return request({
        method:'post',
        url:`/recommend/like?id=${id}&if_like=${if_like}`
    })
}

export default {
    getRecommendData,
    like
}