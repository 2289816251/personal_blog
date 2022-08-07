const tool = 'personal_blog.tool' // 工具分类
const toolData = 'personal_blog.toolData' // 工具分类数据

module.exports = {
    // 获取工具分类数据
    getTool(){
        return `select * from ${tool}`
    },
    // 获取工具数据
    getToolData(classId){
        return `select * from ${toolData} where classId = ${classId} and isDisable = 0`
    }
}