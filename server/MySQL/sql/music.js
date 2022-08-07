const mysql = 'personal_blog.music'
module.exports = {
    getMusicList(){
        return `select * from ${mysql}`
    }
}