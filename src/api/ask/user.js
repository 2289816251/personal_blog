import request from '../request'

// 添加uuid
function addUuid(otherInfo){
    return request({
        method:'post',
        url:`/user/addUuid/${otherInfo}`
    })
}

// 登录
function login(username,password){
    return request({
        method:'post',
        url:`/user/login`,
        data:{
            username,
            password
        }
    })
}

// 注册
function register(uuid,username,password){
    return request({
        method:'post',
        url:`/user/register/${uuid}`,
        data:{
            username,
            password
        }
    })
}

function logout(uuid){
    return request({
        method:'post',
        url:`/user/logout/${uuid}`
    })
}


export default {
    addUuid,
    login,
    register,
    logout
}