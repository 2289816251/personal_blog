const sql = require('../MySQL/sql/user')
const db = require('../MySQL/index')

function getUserInfo (req,res){
    let {username,uuid,otherInfo,imgUrl} = req.auth
	res.send({
        code:200,
        data:{
            username,
            uuid,
            otherInfo,
            imgUrl
        }
    })
}

module.exports = {
    getUserInfo
}