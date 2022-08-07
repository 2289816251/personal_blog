import request from '../request'

function getToolSharing(){
    return request({
        method:'get',
        url:`/toolSharing/getToolSharing`
    })
}

export default {
    getToolSharing
}