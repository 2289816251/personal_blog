import {nextTick, onMounted, onUnmounted, onUpdated} from 'vue'

// top-level component
export const topAnimation = function(){
    nextTick(()=>{
        top()
    })
    onMounted(()=>{
        document.addEventListener('mousewheel',top)
    })
    onUpdated(() => {
        top()
    }),
    onUnmounted(()=>{
        document.removeEventListener('mousewheel',top)
    })
}

// left-level component
export const leftAnimation = function(){
    nextTick(()=>{
        left()
    })
    onMounted(()=>{
        document.addEventListener('mousewheel',left)
    })
    onUpdated(() => {
        left()
    }),
    onUnmounted(()=>{
        document.removeEventListener('mousewheel',left)
    })
}

// right-level component
export const rightAnimation = function(){
    nextTick(()=>{
        right()
    })
    onMounted(()=>{
        document.addEventListener('mousewheel',right)
    })
    onUpdated(() => {
        right()
    }),
    onUnmounted(()=>{
        document.removeEventListener('mousewheel',right)
    })
}

// 从下往上
export const top = function(e){
    const nodeTop = document.querySelectorAll('#top')
    const body = document.querySelector('body')
    const body_height = body.clientHeight // body高度
    // 获取每个节点距离顶部的距离
    nodeTop.forEach(item => {
        // const e_height =  item.offsetHeight // 元素高度
        let domToTop = item.getBoundingClientRect().top  // dom 的顶边到视口顶部的距离
        let num = domToTop - body_height - 100 // 元素距离顶部的距离
        if(num <= 0){
            // 判断是有相关类名 有就返回
            if(item.className.indexOf('topAnimation') !== -1) return
            item.className += ' topAnimation'
        }
    })
}
// 从右往左
export const left = function(e){
    const nodeTop = document.querySelectorAll('#left')
    const body = document.querySelector('body')
    const body_height = body.clientHeight // body高度
    // 获取每个节点距离顶部的距离
    nodeTop.forEach(item => {
        // const e_height =  item.offsetHeight // 元素高度
        let domToTop = item.getBoundingClientRect().top  // dom 的顶边到视口顶部的距离
        let num = domToTop - body_height// 元素距离顶部的距离
        if(num <= 0){
            // 判断是有相关类名 有就返回
            if(item.className.indexOf('leftAnimation') !== -1) return
            item.className += ' leftAnimation'
        }
    })
}

// 从左往右
export const right = function(e){
    const nodeTop = document.querySelectorAll('#right')
    const body = document.querySelector('body')
    const body_height = body.clientHeight // body高度
    // 获取每个节点距离顶部的距离
    nodeTop.forEach(item => {
        // const e_height =  item.offsetHeight // 元素高度
        let domToTop = item.getBoundingClientRect().top  // dom 的顶边到视口顶部的距离
        let num = domToTop - body_height// 元素距离顶部的距离
        if(num <= 0){
            // 判断是有相关类名 有就返回
            if(item.className.indexOf('rightAnimation') !== -1) return
            item.className += ' rightAnimation'
        }
    })
}