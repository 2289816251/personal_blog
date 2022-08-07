import request from '../request'

// 获取音乐列表
function getMusicList(){
    return request({
        method:'get',
        url:'/music/getMusicList'
    })
}

export default {
    getMusicList
}