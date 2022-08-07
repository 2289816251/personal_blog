export default [
    { // 主页
        name:'home',
        path:'/home',
        component:()=>import('@/view/Home'),
        // 配置路由元信息
        meta:{
            title:'主页',
            nav:true
        }
    },
    { // 最新推荐
        name:'recommend',
        path:'/recommend',
        component:()=>import('@/view/Recommend'),
        // 配置路由元信息
        meta:{
            title:'最新推荐',
            nav:true
        }
    },
    { // 前端
        name:'FrontEnd',
        path:'/frontEnd',
        component:0,
        // 配置子路由
        children:[
            {
                name:'HTML',
                path:'html',
                component:()=>import('@/view/FrontEnd/HTML'),
                meta:{
                    title:'HTML'
                }
            },
            {
                name:'JavaScript',
                path:'javascript',
                component:()=>import('@/view/FrontEnd/JavaScript'),
                meta:{
                    title:'JavaScript'
                }
            }
        ],
        // 配置路由元信息
        meta:{
            title:'前端',
            nav:true
        }
    },
    { // 工具分享
        name:'toolSharing',
        path:'/toolSharing',
        component:()=>import('@/view/ToolSharing'),
        // 配置路由元信息
        meta:{
            title:'工具分享',
            nav:true
        }
    },
    { // 其他
        name:'Other',
        path:'/other',
        component:0,
        // 配置路由元信息
        meta:{
            title:'其他',
            nav:true
        },
        // 配置子路由
        children:[
            {
                name:'Index',
                path:'index',
                component:()=>import('@/view/Other'),
                meta:{
                    title:'index'
                }
            }
        ]
    },
    { // 关于我
        name:'aboutMe',
        path:'/aboutMe',
        component:()=>import('@/view/AboutMe'),
        // 配置路由元信息
        meta:{
            title:'关于我',
            nav:true
        }
    },
    { // 搜索结果页
        name:'search',
        path:'/search/:keyword',
        component:()=>import('@/view/Search'),
        props:true,
        // 配置路由元信息
        meta:{
            title:'搜索结果',
            nav:false
        }
    },
    // 重定向 在项目跑起来的时候 访问“/”的时候 定位在主页
    {
        path:'/',
        redirect:'/home'
    }
]