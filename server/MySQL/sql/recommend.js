const mysql = 'personal_blog.recommend'
module.exports = {
    // 获取数据
    getRecommend(){
        // 根据发布时间倒叙 - 时间最近的排最前面
        return `select * from ${mysql} order by releaseTime desc`
    },
    // 查询点赞
    queryLike(id){
        return `select likes from ${mysql} where (id = ${id})`
    },
    // 点赞
    like(id){
        return `update ${mysql} set ? where (id = ${id})`
    }
}