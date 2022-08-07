const sql = require('../MySQL/sql/toolSharing')
const db = require('../MySQL/index')

// 获取工具数据
function getToolSharing(req,res){
    db.query(sql.getTool(),(err,data)=>{
        if(err) return res.cc(err)
        
        let arr = data

        let newArr = []

        for(let i = 0;i<arr.length;i++){
            db.query(sql.getToolData(arr[i].id),(err,result)=>{
                if(err) return res.cc(err)

                newArr.push({
                    title:arr[i].title,
                    children:result
                })
                if(i == arr.length - 1){
                    res.send({
                        code:200,
                        data:newArr
                    })
                }
            }) 
        }

    })
}

module.exports = {
    getToolSharing
}