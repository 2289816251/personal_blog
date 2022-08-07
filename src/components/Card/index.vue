<template>
  <div class="card" v-if="data" id="top">
    <div class="img">
        <img :src="data.imgUrl" alt="">
    </div>
    <div class="content">
        <div class="title">
            {{data.title}}
        </div>
        <div class="big_class" v-if="toggleClass == 'bigLabel'">
            <div class="item" v-for="(item,index) in list" :key="index" @click="pushPage(item)">
                {{item}}
            </div>
        </div>
        <div class="small_class" v-if="toggleClass == 'smallLabels'">
            <div class="item" v-for="(item,index) in list" :key="index">
                {{item}}
            </div>
        </div>
        <div class="user">
            <div class="left">
                <div class="useravatar">
                    <img :src="data.userAvatar" alt="">
                </div>
                <div class="username">
                    {{data.userName}}
                </div>
                <div class="dian">
                    ·
                </div>
                <div class="time">
                    {{times}}
                </div>
            </div>
            <div class="right">
                <!-- 点赞 -->
                <div class="like" @click="changeLike(data.id)" title="点赞">
                    <div v-show="!like">
                        <like-outlined :style="{fontSize: size + 'px'}" />
                        <span v-if="data.likes >= 1">{{data.likes}}</span>
                    </div>
                    <div v-show="like" :class="{slideCenter:like}">
                        <like-filled :style="{fontSize: size + 'px',color: 'red'}" />
                        <span v-if="data.likes >= 1">{{data.likes}}</span>
                    </div>
                </div>
                <!-- 分享 -->
                <div class="share" @click="share(data.id)" title="转发">
                    <select-outlined :style="{fontSize: size + 'px',transform: 'rotateY(180deg)'}" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {computed, reactive, toRefs, getCurrentInstance, onUpdated} from 'vue'
import { topAnimation } from '@/hooks/useAnimation'
import dayjs from 'dayjs'
import {LikeOutlined,DislikeOutlined,SelectOutlined,LikeFilled,DislikeFilled} from '@ant-design/icons-vue'
import throttle from 'lodash/throttle'
export default {
    props:{
        data:{
            type: Object
        },
        toggleClass:{
            type: String,
            default: 'bigLabel'
        },
    },
    setup(props) {
        topAnimation()

        const {proxy} = getCurrentInstance()

        let d = reactive({
            list:[], // 分类
            times:'', // 时间
            size: 18, // 图标大小
            like: false // 点赞
        })

        // 点赞 - 节流
        let changeLike = throttle((id)=>{
            proxy.$api.like(id,!d.like).then((res)=>{
                d.like = !d.like
                if(res.code == 200){
                    props.data.likes = res.data
                }
            })
        },2000)

        let methods = reactive({
            // 转发
            share(id){
                console.log(id)
            },
            // 跳转页面
            pushPage(value){
                proxy.mittBus.emit('changNva','/frontEnd/'+value)
                proxy.$router.push({
                    name: value
                })
            }
        })

        // 计算出分类的数据
        d.list = computed(() => {
            return props.data.class ? props.data.class.split(',') : ''
        })
        // 计算出发布时间
        d.times = computed(() => {
            // 今天
            const day = dayjs().format('YYYY-MM-DD HH:mm:ss').split(' ')[0].toString().split('-')
            // 发布时间
            const releaseRTime = props.data.releaseTime ? props.data.releaseTime.split(' ')[0].toString().split('-') : ''
            // 循环判断时间
            for(let i = 0; i < day.length; i++){
                // 如果今天时间的年份和发布时间的年份不一致，则返回年份
                if(day[0] !== releaseRTime[0]){
                    const year = day[0] > releaseRTime[0] ? day[0] - releaseRTime[0] : releaseRTime[0] - day[0]
                    return year ? year + '年前' : '未知'
                }else if(day[1] !== releaseRTime[1]){
                    const year = day[1] > releaseRTime[1] ? day[1] - releaseRTime[1] : releaseRTime[1] - day[1]
                    return year ? year + '月前' : '未知'
                }else{
                    const year = day[2] > releaseRTime[2] ? day[2] - releaseRTime[2] : releaseRTime[2] - day[2]
                    if(year==0) return '今天'
                    if(year > 7) return '一周前'
                    return year ? year + '天前' : '未知'
                }
            }
        })

        return {
            ...toRefs(d),
            ...toRefs(methods),
            changeLike
        }
    },
    components:{ DislikeOutlined, LikeOutlined, SelectOutlined, LikeFilled, DislikeFilled }
}
</script>

<style lang="less" scoped>
@import url('@/assets/less/animation.less');
@import url('@/assets/less/color.less');

@userImg:30px;

.card{
    width: auto;
    height: auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 10px @bs-color;
    .img{
        width: 100%;
        height: 280px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img{
            width: 140%;
            height: 140%;
            transition: all 0.5s;
        }
        &:hover{
            img{
                width: 200%;
                height: 200%;
            }
        }
    }
    .content{
        padding: 20px 30px;
        .title{
            cursor: pointer;
            font-size: 1.8em;
            font-family: pfzg;
            font-weight: bold;
            transition: all 0.5s;
            overflow: hidden;
            word-break: keep-all; // 不换行
            text-overflow: ellipsis; // 超出隐藏
            white-space: nowrap; // 强制在一行
            &:hover{
                color: @f-active;
            }
        }
        .big_class{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .item{
                cursor: pointer;
                margin: 10px 0;
                padding: 0 10px;
                background: @f-active;
                color: @f-color2;
                font-family: fontOne;
                font-size: 1.8rem;
                border-radius: 4px;
                padding-top: 4px;
                line-height:32px;
                // vertical-align: bottom;
                transition: all 0.5s;
                &:not(:last-child){
                    margin-right: 10px;
                }
                &:hover{
                    background-color: @f-hover;
                }
            }
        }
        .small_class{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .item{
                cursor: pointer;
                color: @f-color;
                font-family: pfcg;
                font-size: 1.6rem;
                border-radius: 4px;
                padding-top: 4px;
                line-height:32px;
                // vertical-align: bottom;
                transition: all 0.5s;
                &:not(:last-child){
                    margin-right: 10px;
                }
                &:not(:last-child)::after{
                    content: '/';
                    margin-left: 8px;
                }
                &:hover{
                    color: @f-active;
                }
            }
        }
        .user{
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            .left{
                display: flex;
                align-items: center;
                font-family: bfcg;
                .useravatar{
                    width: @userImg;
                    height: @userImg;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .username{
                }
                .dian{
                    margin: 0 6px;
                }
                .time{

                }
            }
            .right{
                display: flex;
                align-items: center;
                height: userImg;
                line-height: userImg;
                border-radius: 4px;
                overflow: hidden;
                padding: 0 4px;
                background-color: @bs-color;
                div{
                    padding: 2px 4px;
                    display: flex;
                    align-items: center;
                    line-height: userImg;
                    span{
                        display: flex;
                        align-items: center;
                        line-height: userImg !important;
                        margin: 0 2px;
                        font-weight: 800;
                        font-family: pfcg;
                        font-size: 1.6rem;
                        color: @f-color3;
                    }
                }
            }
        }
    }
}

// 点赞动画
.slideCenter{-webkit-animation:puff-in-center .7s cubic-bezier(.47,0.000,.745,.715) both;animation:puff-in-center .7s cubic-bezier(.47,0.000,.745,.715) both}
@-webkit-keyframes puff-in-center{0%{-webkit-transform:scale(2);transform:scale(2);-webkit-filter:blur(4px);filter:blur(4px);opacity:0}100%{-webkit-transform:scale(1);transform:scale(1);-webkit-filter:blur(0);filter:blur(0);opacity:1}}@keyframes puff-in-center{0%{-webkit-transform:scale(2);transform:scale(2);-webkit-filter:blur(4px);filter:blur(4px);opacity:0}100%{-webkit-transform:scale(1);transform:scale(1);-webkit-filter:blur(0);filter:blur(0);opacity:1}}

// // 未知
// .unknown{
//     background-color: rgba(187, 187, 185, 0.8);
//     box-shadow: 0px 0px 10px #838383;
//     color: @f-color2;
//     text-shadow: 0px 0px 6px @f-color3;
// }
// // 今天
// .today{
//     background-color: rgba(251, 35, 35, 0.8);
//     box-shadow: 0px 0px 10px #eb1b1b;
//     color: @f-color2;
//     text-shadow: 0px 0px 6px @f-color3;
// }
// // 天前
// .day{
//     background-color: rgba(251, 99, 35, 0.8);
//     box-shadow: 0px 0px 10px #f24b0b;
//     color: @f-color2;
//     text-shadow: 0px 0px 6px @f-color3;
// }
// // 月前
// .month{
//     background-color: rgba(251, 219, 51, 0.8);
//     box-shadow: 0px 0px 10px #fbd303;
//     color: @f-color2;
//     text-shadow: 0px 0px 6px @f-color3;
// }
// // 年前
// .year{
//     background-color: rgba(99, 251, 123, 0.8);
//     box-shadow: 0px 0px 10px #2bdb53;
//     color: @f-color2;
//     text-shadow: 0px 0px 6px @f-color3;
// }
</style>