import {onMounted,onUnmounted} from 'vue'

// 监听滚动事件
export const highlyAdaptive = () => {
    onMounted(() => {
        const header = document.querySelector('#headerBg')
        header.className -= ''
        // 全局绑定鼠标滚轮事件
        document.addEventListener('mousewheel',fun)
    }),
    onUnmounted(() => {
        document.removeEventListener('mousewheel',fun)
    })
}

// 直接添加类名
export const headerHeight = () =>{
    onMounted(()=>{
        const header = document.querySelector('#headerBg')
        header.className = 'height'
    })
}

export const setHeight = ()=>{
    const height = document.querySelector('.height').offsetHeight;
    return height + 30
}

// 固定
export const posiHeightTrue = ()=>{
    const html = document.querySelector('html')
    html.style.position = 'fixed'
}
// 取消固定
export const posiHeightFalse = ()=>{
    const html = document.querySelector('html')
    html.style.position = 'relative'
}

const fun = function(e){
    const header = document.querySelector('#headerBg')
    // 获取鼠标滚动方向
    const num = e.wheelDelta
    // 页面滚动条高度
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // 往山滚
    if(num > 0){
        // 判断是否小于100
        if(scrollTop < 100){
            header.className = ''
        }
    }else{
        // 判断是否大于100
        if(scrollTop > 50){
            header.className = 'height'
        }
    }
}