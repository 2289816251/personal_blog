// 最新推荐数据库
const sql = 'personal_blog.recommend'

module.exports = {
    // 通过分类关键字获取文章数据
    getFrontEndData(key,sort){
        // 模糊查询 并排序
        return `select * from ${sql} where class like '%${key}%' order by releaseTime ${sort}`
    }
}