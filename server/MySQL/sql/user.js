const users = 'personal_blog.users' // 用户数据

module.exports = {
    // 获取用户数据
    queryUsers(){
        return `select * from ${users}`
    },
    // 添加数据 - uuid - other
    addUuid(uuid,otherInfo){
        return `insert into ${users}(uuid,otherInfo) values('${uuid}','${otherInfo}')`
    },
    // 查询指定字段
    queryField(fieldName,fieldValue){
        return `select ${fieldName} from ${users} where ${fieldName} = '${fieldValue}' and status != 0`
    },
    // 查询所有字段
    queryFieldAll(fieldName,fieldValue){
        return `select * from ${users} where ${fieldName} = '${fieldValue}' and status != 0`
    },
    // 登录
    login(uuid){
        return `update ${users} set ? where uuid = '${uuid}'`
    },
    // 注册 - 通过uuid更新数据
    register(uuid){
        return `update ${users} set ? where uuid = '${uuid}'`
    },
    // 登出 - 通过uuid更新数据
    logout(uuid){
        return `update ${users} set ? where uuid = '${uuid}'`
    }
}