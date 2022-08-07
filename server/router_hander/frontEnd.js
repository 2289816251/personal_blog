const sql = require('../MySQL/sql/frontEnd')
const db = require('../MySQL/index')

t = 10
// 根据分类关键字模糊搜素
function getFrontEndData(req,res){
    let {key,sort,page} = req.params
    // 如果page存在，则改变p的值
    if(page){
        p = (page*10)-10
    }else{ // 如果page不存在，则p为1
        p = 1
    }
    db.query(sql.getFrontEndData(key,sort),(err,data)=>{
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
    getFrontEndData
}