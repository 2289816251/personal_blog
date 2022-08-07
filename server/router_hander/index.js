const sql = require('../MySQL/sql/index')
const db = require('../MySQL/index')

// 获取友链数据
function getFriendsChain(req,res){
    db.query(sql.getFriendsChain(),(err,result)=>{
        if(err) return res.cc(err)
        res.send({
            code:200,
            data:result
        })
    })
}

// 获取推荐文章数据
function getArticle(req,res){
    db.query(sql.getArticle(),(err,result)=>{
        if(err) return res.cc(err)
        res.send({
            code:200,
            data:result
        })
    })
}

t=10
// 通过搜素关键词获取数据
function getArticleBySearch(req,res){
    let {keyword,page} = req.params
    // 如果page存在，则改变p的值
    if(page){
        p = (page*10)-10
    }else{ // 如果page不存在，则p为1
        p = 1
    }
    db.query(sql.getArticleBySearch(keyword),(err,data)=>{
        if(err) return res.cc(err)
        let arr = []
        for(let i = 0;i<t;i++){
            arr.push(data[(p)+i])
        }
        res.send({
            code:200,
            data:arr
        })
    })
}

module.exports = {
   getFriendsChain,
   getArticle,
   getArticleBySearch
}