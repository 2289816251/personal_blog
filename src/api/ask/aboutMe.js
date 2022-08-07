import request from '../request'

// 获取分类数据数据
function getAboutMe () {
    return request({
        method:'get',
        url:`/aboutMe/getAboutMe`
    })
}

export default {
    getAboutMe
}