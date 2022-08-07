const aboutMeJSON = require('../json/personalInfo.json');

function getAboutMe (req,res){
    res.send({
        code:200,
        data:aboutMeJSON
    })
}

module.exports = {
    getAboutMe
}