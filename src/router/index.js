import {createRouter,createWebHashHistory} from 'vue-router'


import routes from './routers'


const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior:(to, from, savedPosition)=>{
        // 滚动条滚到到顶部
        return {top:0}
    }
})

// 全局前置路由守卫
router.beforeEach((to,from,next)=>{
    // 设置网页标题
    document.title = 'Capricornus 的个人博客 - ' + to.meta.title
    next()
})

export default router