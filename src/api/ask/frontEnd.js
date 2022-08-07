import request from '../request'

// 获取分类数据数据
function getFrontEndData (key,sort,page) {
    return request({
        method:'get',
        url:`/frontEnd/getFrontEndData/${key}/${sort}/${page}`
    })
}

export default {
    getFrontEndData
}