<template>
    <!-- 使用拼接字符串 动态添加样式 -->
    <div id="music_player" 
    ref="music_player" 
    :style="position+`:0;`+posi+':'+loca+'px'+';transform: translate'+direction+'('+translate+'px);'"
    >
        <Music :dataList="dataList"></Music>
        <!-- :style="SidePosi == 'left' || SidePosi == 'right' ? 'top:0' : ''" -->
        <!-- SidePosi+':'+SideLoca+'px' -->
        <div class="side" :class="className">
            <!-- 时间 -->
            <div class="times">
                <span>
                    {{times.hour}}
                </span>
                <span>
                    {{times.minute}}
                </span>
            </div>
            <!-- 开关 -->
            <div class="switchMode" title="切换主题">
                <a-switch size="small" :checked="switchMode" @change="toggle"/>
            </div>
            <!-- 音乐 -->
            <div class="music_icon" title="音乐">
                <img src="./assets/icon/Sidebar/music.png" alt="音乐">
            </div>
            <!-- 更多 -->
            <div class="more_icon" title="更多">
                <img src="./assets/icon/Sidebar/More.png" alt="更多">
            </div>
            <!-- 切换隐藏和显示 -->
            <div class="toggle_icon" @click="toggleSide" :style="'transform: rotateZ('+switchAngle+'deg)'" title="显示/隐藏">
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, toRaw, toRefs} from 'vue'
import usePosition from './hooks/usePosition/index'
import {Switch} from 'ant-design-vue'
import {SidebarStore} from './pinia/index'
import {storeToRefs} from 'pinia'
import {setTheme} from './assets/js/editTheme.js'
import Music from './components/music.vue'

import dayjs from 'dayjs'
export default {
    name:'Personal_blog',
    props:['position','location','dataList'],
    data() {
        return {
            musciNode:'', // 音乐播放器节点
            translate:0
        }
    },
    setup(props,context){

        const Sidebar = SidebarStore()
        const {switchMode} = storeToRefs(Sidebar)
        Sidebar.dataList = toRaw(props.dataList)
        let data = reactive({
            isShow:false,
            times:{
                hour:'00',
                minute:'00'
            }, // 时间
            timeId:'', // 定时器
            toggle(){ // 切换主题
                Sidebar.switchMode = !Sidebar.switchMode
                // 改变主题
                if(Sidebar.switchMode){
                    setTheme('Satsuki')
                }else{
                    setTheme('dark')
                }
            },
            init(){ // 初始化
                setTheme('dark')
                let theme =  localStorage.getItem("theme"); // 获取本地
                if(theme == 'dark'){
                    Sidebar.switchMode = false
                }
            },
            getTimes(){ // 获取事件
                data.timeId = setInterval(()=>{
                    let time = dayjs().format('HH-mm')
                    let arr = time.split('-')
                    data.times = {
                        hour:arr[0],
                        minute:arr[1]
                    }
                },1000)
            }
        })
        
        onMounted(()=>{
            
        })

        let locationInfo = usePosition(props)

        return {
            switchMode,
            ...toRefs(locationInfo),
            ...toRefs(data)
        }
    },
    methods:{
        toggleSide(){ // 切换显示隐藏音乐播放器
            let width = this.musciNode.offsetWidth
            let height = this.musciNode.offsetHeight
            let theme =  localStorage.getItem("theme");
            if(this.isShow){ // 
                if(this.position == 'top' || this.position == 'bottom'){
                    this.translate += this.position == 'top' ? height : -height
                    this.switchAngle-=180
                }else{
                    this.translate += this.position == 'left' ? width : -width
                    this.switchAngle-=180
                }
            }else{
                if(this.position == 'top' || this.position == 'bottom'){
                    this.translate -= this.position == 'top' ? height : -height
                    this.switchAngle-=180
                }else{
                    this.translate -= this.position == 'left' ? width : -width
                    this.switchAngle+=180
                }
            }
            // 重新获取颜色属性
            this.$nextTick(()=>{
                setTheme(theme)
            })
            this.isShow = !this.isShow
        }
    },
    components:{
        ASwitch:Switch,
        Music
    },
    mounted(){
        this.init() // 初始化
        this.musciNode =  this.$refs.music_player // 获取音乐播放器节点
        this.getTimes()
    },
    unmounted() {
        // 清除定时器
        clearInterval(this.timeId)
    },
}
</script>

<style lang="less" scoped>
// @import './assets/less/color.less';
#music_player{
    z-index: 99999;
    width: auto;
    height: auto;
    position: fixed !important;
    justify-content: space-between;
    transition: all 0.5s;
    background: rgba(@primaryColor,1) !important;
    color: rgba(@primaryTextColor,1) !important;
    box-shadow: 0px 0px 10px rgba(@primaryTextColor,0.3) important;
    position: absolute;
    .side{
        position: absolute;
        background: rgba(@primarySideColor,1) !important;
        color: rgba(@primarySideTextColor, 1) !important;
        display: flex;
        align-items: center;
        justify-content: center;
        &>div:not(:first-child){
            width: 40px;
            height: 40px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.5s;
        }
        .times{ // 时间
            cursor:pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span{
                height: 14px;
                font-weight: 500;
            }
        }
        .switchMode{ // 开关
            display: flex;
            align-items: center;
            line-height: 34px;
            span{
                margin-right: 10px;
            }
        }
        .music_icon{ // 音乐
            cursor:pointer;
            line-height: 34px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .more_icon{ // 更多
            cursor:pointer;
            line-height: 34px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .toggle_icon{ // 切换隐藏和现实
            line-height: 34px;
            display: flex;
            flex-direction: column;
            cursor:pointer;
            span{
                width: 14px;
                height: 2px;
                background: rgba(@primarySideTextColor,1);
            }
            &>:first-child{
                transform: rotateZ(-45deg);
                margin-bottom: 3px;
            }
            &>:last-child{
                transform: rotateZ(45deg);
                margin-top: 3px;
            }
        }
        &>div:hover:not(:first-child){
            background: linear-gradient(145deg, #313131, #1b1818);
            box-shadow:  6px 6px 18px #161616,
                        -6px -6px 18px #1e1e1e;
        }
    }
}
.SideLeft{
    padding: 20px 6px;
    right: -52px;
    top: 0;
    border-radius: 0px 10px 10px 0px;
    flex-direction: column;
    &>div:not(:last-child){
        margin-bottom: 10px;
    }
}
.SideRight{
    padding: 20px 6px;
    left: -52px;
    top: 0;
    border-radius: 10px 0px 0px 10px;
    flex-direction: column;
    &>div:not(:last-child){
        margin-bottom: 10px;
    }
}
.SideTop{
    padding: 6px 20px;
    left: 0px;
    bottom: -52px;
    border-radius: 0px 0px 10px 10px;
    flex-direction: row;
    &>div:not(:last-child){
        margin-right: 10px;
    }
}
.SideBottom{
    padding: 6px 20px;
    left: 0px;
    top: -52px;
    border-radius: 10px 10px 0px 0px;
    flex-direction: row;
    &>div:not(:last-child){
        margin-right: 10px;
    }
}
</style>