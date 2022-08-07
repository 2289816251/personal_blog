# 个人博客

## 描述
由本人兴趣而开发 

## 技术栈

### 前台
- 框架：vue3 - https://v3.cn.vuejs.org/
- UI组件库：Ant Design vue - https://www.antdv.com/docs/vue/migration-v3-cn
- 部分图标使用阿里巴巴矢量库：https://www.iconfont.cn/
- 首页轮播图二次封装的Swiper：https://www.swiper.com.cn/
- 状态管理使用：Pinia - https://pinia.web3doc.top/
- 音乐播放器所使用网易云外链：https://music.163.com/song/media/outer/url?id=1936525760.mp3
  - 修改id值获取歌曲
- 所使用的依赖请查看 package.json 文件

### 后台
- 暂无开发

### 后端
- 使用 NodeJs 进行开发 - https://nodejs.org/zh-cn/
- 使用 Express 搭建接口服务器 - https://www.expressjs.com.cn/
- 使用 MySQL 存储数据 - https://www.mysql.com/cn/

## 使用

1.  克隆项目至本地
2.  npm i 初始化项目
3.  

## 测试说明

1.  暂无

## 贡献

1.  何浪浪 - https://gitee.com/he-langlang


## 功能
1.  发布、查看文章
2.  音乐播放器

# 目录结构

```
├── public
│   └── favicon.png          # favicon
│   └── index.html           # 入口 HTML
├── server
|	├── json				 # 本地JSON
|	├── MySQL				 # 数据库
|	├── router				 # 路由配置
|	├── router_hander		 # 路由回调
|	├── app.js				 # 服务器根文件
|	├── config.js			 # 配置文件
├── src
|	├── api					 # api接口
│   ├── assets               # 本地静态资源
│   ├── components           # 内置通用组件
|	├── hooks 				 # hook文件
│   ├── router               # 路由配置
│   ├── store                # pinia 状态管理配置
│   ├── view                 # 路由组件
│   ├── App.vue              # 应用入口组件
│   └── main.js              # 应用入口js
├── package.json             # package.json
├── README.md                # README.md
└── vue.config.js            # vue 配置文件
```

