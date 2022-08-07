<template>
  <div class="banner" :style="'width:'+width+';height:'+height">
    <swiper
    :modules="modules"
    :slides-per-view="perView"
    :speed="speed"
    :loop="loop"
    :space-between="spaceBetween"
    @swiper="onSwiper"
    @slideNextTransitionStart="chengeRight"
    @slidePrevTransitionStart="chengeLeft"
    :autoplay="autoplay"
    :effect="effect"
    >
        <swiper-slide v-for="(item,index) in dataList" :key="index">
            <img :src="item.imgUrl" alt="加载失败！">
        </swiper-slide>
    </swiper>
    <div class="content">
        <div v-for="(item,i) in dataList" :key="i" :class="{shake:i == index}" v-show="i == index">
            <div class="title">
                {{item.title}}
            </div>
            <div class="describe">
                {{item.describe}}
            </div>
            <div class="button">
                <a target="_block" :href="item.src">了解更多</a>
            </div>
        </div>
    </div>
    <div class="bg">
        <div class="top">

        </div>
        <div class="left">

        </div>
        <div class="right">

        </div>
    </div>  
  </div>
</template>

<script>
import { Autoplay, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import { reactive, toRefs } from 'vue';
export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    props:{
        width:{
            type:String,
            default:'100%'
        },
        height:{
            type:String,
            default:'500px'
        },
        dataList:{ // 轮播图数据
            type:Array, // 数组
            default:[] // 默认空数组
        },
        loop:{ // 自动切换
            type:Boolean, // 布尔值
            default:true // 默认true
        },
        effect:{ // 切换效果
            type:String, // 字符串
            default:'slide' // 默认 slide - 平移
        },
        perView:{ // 页面中每次显示几个图片
            type:Number, // 数字
            default:1 // 默认只显示一张
        },
        spaceBetween:{ // 轮播图之间的间距
            type:Number, // 数字
            default:0 // 默认 0 没有间距
        },
        speed:{ // 滑动速度
            type:Number, // 数字
            default:1200 // 默认速度 1200
        },
        autoplay:{ // 自动切换配置
            type:Object, // 对象
            default:{ delay: 5000, disableOnInteraction: false } // 默认每隔3秒切换一次 触碰也不会停止
        }
    },
    setup(props) {
        let data = reactive({
            index:0,
            list:props.dataList
        })
        // 初始化回调
      const onSwiper = (swiper) => {};
        // 向右切换回调
      const chengeRight = () => {
        if(data.index >= props.dataList.length-1){
            data.index = 0
            return
        }
        data.index++
      };
    // 向左切换回调
    const chengeLeft = ()=>{
        if(data.index <= 0){
            data.index = props.dataList.length - 1
            return
        }
        data.index--
    }
      return {
        ...toRefs(data),
        onSwiper,
        chengeRight,
        chengeLeft,
        modules: [Autoplay, EffectFade],
      };
    },
}
</script>

<style lang="less" scoped>
@import url('@/assets/less/color.less');
.banner{
    overflow: hidden;
    position: relative;
    .swiper{
        width: 100%;
        height: 100%;
        .swiper-slide{
            width: 100%;
            height: 100%;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            img{
                vertical-align: top;
                width: 100%;
                height: auto;
            }
        }
    }
    .content{
        z-index: 99;
        color: @bg-color;
        position: absolute;
        top: 50%;
        transform: translate(0%,-50%);
        padding: 160px 100px 0;
        .title{
            font-size: 4.8rem;
            font-family: fontOne;
        }
        .describe{
            padding-top: 20px;
            font-size: 1.8rem;
            font-family: fontTwo;
        }
        .button{
            padding-top: 20px;
            a{
                width: 100px;
                display: block;
                transition: all 0.5s;
                background-color: transparent;
                padding: 10px 20px;
                color: @bg-color;
                border: 2px solid @bg-color;
                border-radius: 4px;
                &:hover{
                    background-color: @f-active;
                    border: 2px solid @f-active;
                }
            }
        }
    }
    .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 9;
        .top{
            height: 11.5%;
            background-image: linear-gradient(#1a1a1a,rgba(0, 0, 0, 0));
        }
        .left{
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 10%;
            background-image: linear-gradient(to right,#1a1a1a,rgba(0, 0, 0, 0));
        }
        .right{
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 10%;
            background-image: linear-gradient(to left,#1a1a1a,rgba(0, 0, 0, 0));
        }
    }
}
.shake {
    animation: shake 1.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
}

@keyframes shake {
    0%{
        opacity: 0;
        transform: translateX(140px);
    }
    100%{
        opacity: 1;
        transform: translateX(0px);
    }
}
</style>