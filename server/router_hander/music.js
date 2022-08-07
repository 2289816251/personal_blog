const sql = require('../MySQL/sql/music')
const db = require('../MySQL/index')

// 获取音乐列表
function getMusicLisr(req,res){
    db.query(sql.getMusicList(),(err,result)=>{
        if(err) return res.cc(err)
        res.send({
            code:200,
            data:result
        })
    })
}

module.exports = {
    getMusicLisr
}