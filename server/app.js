const express = require('express')

// 引入解密
const { expressjwt:jwt } = require("express-jwt")
// 引入加密文件
const config = require('./config')

// 引入路由
const musicRouter = require('./router/music')
const homeRouter = require('./router/home')
const indexRouter = require('./router/index')
const recommendRouter = require('./router/recommend')
const frontEndRouter = require('./router/frontEnd')
const toolSharingRouter = require('./router/toolSharing')
const aboutMeRouter = require('./router/aboutMe')
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
// 引入cors
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// 配置跨域
app.use(cors())
// 配置解析body中间件
app.use(bodyParser({extended:false}))
// 定义中间件
app.use((req,res,next)=>{
    // code 默认为201
    // err 错误信息
    res.cc=(err,code = 201) =>{
        res.send({
            code,
            msg:err
        })
    }
    next()
})

// 配置解析token中间件
app.use(jwt({secret:config.secretKey,algorithms:['HS256']}).unless({path:[
    {
        url:/^\/music/
    },
	{
		url:/^\/home/
	},
	{
		url:/^\/index/
	},
    {
        url:/^\/recommend/
    },
    {
        url:/^\/frontEnd/
    },
    {
        url:/^\/toolSharing/
    },
    {
        url:/^\/aboutMe/
    },
    {
        url:/^\/user/
    }
]}))


// 不需要携带token的接口
app.use('/music',musicRouter)
app.use('/home',homeRouter)
app.use('/index',indexRouter)
app.use('/recommend',recommendRouter)
app.use('/frontEnd',frontEndRouter)
app.use('/toolSharing',toolSharingRouter)
app.use('/aboutMe',aboutMeRouter)
app.use('/user',userRouter)

// 需要携带token的接口
app.use('/api',userInfoRouter)

// 错误中间件
app.use((err,req,res,next)=>{
    // 捕获token验证失败的错误
    if(err.name == 'UnauthorizedError') return res.cc('token已失效或已过期')
    res.cc(err.message)
    next()
})

app.listen(8000,()=>{
    console.log('服务器启动中 地址：http://127.0.0.1:8000')
})