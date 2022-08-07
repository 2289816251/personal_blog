const sql = require('../MySQL/sql/recommend')
const db = require('../MySQL/index')

let p = 0 // 第一页
let t = 10 // 每页多少条数据
function getRecommend(req,res){
    const page = req.params.page

    // 如果page存在，则改变p的值
    if(page){
        p = (page*10)-10
    }else{ // 如果page不存在，则p为1
        p = 1
    }

    db.query(sql.getRecommend(),(err,data)=>{
        if(err) return res.cc(err)
        let arr = []
        for(let i = 0;i<t;i++){
            arr.push(data[(p-1)+i])
        }
        res.send({
            code:200,
            data:arr
        })
    })
}

function like(req,res){
    const id = req.query.id
    const if_like = req.query.if_like    
    // 先查询
    db.query(sql.queryLike(id),(err,data)=>{
        if(err) return res.cc(err)
        let num = data[0].likes

        if(if_like == 'true'){
            num++
        }else{
            num <= 0 ? num = 0 : num--
        }
        // 更新
        db.query(sql.like(id),{likes:num},(err,data)=>{
            if(err) return res.cc(err)
            res.send({
                code:200,
                data:num
            })
        })
    })                                                                                                                                                                                                                                                                                                                                                                                                       
}

module.exports = {
    getRecommend,
    like
}