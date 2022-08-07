import request from '../request'

// 获取用户信息
function getUserInfo(){
    return request({
        url:'/api/getUserInfo',
        method:'get'
    })
}
                                                                                                                                                                                                                                                                                                             
export default {
    getUserInfo
}