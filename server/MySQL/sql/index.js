// 友链数据库
const FriendsChain = 'personal_blog.friendschain'
// 最新推荐数据库
const Recommend = 'personal_blog.recommend'

module.exports = {
    // 获取友链数据
    getFriendsChain(){
        return `select * from ${FriendsChain}`
    },
    // 获取推荐文章数据
    getArticle(){
        return `select * from ${Recommend} where Article = 1`
    },
    // 通过搜索关键词获取数据
    getArticleBySearch(keyword){
        return `select * from ${Recommend} where title like '%${keyword}%'`
    }
}