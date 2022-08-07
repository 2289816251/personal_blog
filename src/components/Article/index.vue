<template>
  <div class="article" id="left">
    <div class="title">
        推荐文章
        <read-outlined :style="{fontSize: size + 'px'}" />
    </div>
    <div class="list">
        <div class="item" v-for="(item,index) in dataList" :key="index">
            <div class="img">
                <img :src="item.imgUrl" alt="加载失败！">
            </div>
            <div class="content">
                <div class="title">
                    {{item.title}}
                </div>
                <div class="userInfo">
                    {{item.userName}}
                    <span>·</span>
                    {{times}}
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {ReadOutlined} from '@ant-design/icons-vue'
import {left} from '@/hooks/useAnimation'
import { onUpdated, getCurrentInstance, reactive, toRefs, computed } from 'vue'
import dayjs from 'dayjs'
export default {
    setup(props) {
        const {proxy} = getCurrentInstance()

        let data = reactive({
            dataList:[],
            size:18,
        })

        let methods = reactive({
            getArticle(){
                proxy.$api.getArticle().then((res)=>{
                    if(res.code == 200){
                        data.dataList = res.data
                    }
                })
            }
        })

        // 计算出发布时间
        data.times = computed(() => {
            // 今天
            const day = dayjs().format('YYYY-MM-DD HH:mm:ss').split(' ')[0].toString().split('-')
            // 发布时间
            const releaseRTime = data.dataList.releaseTime ? data.dataList.releaseTime.split(' ')[0].toString().split('-') : ''
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

        methods.getArticle()

        onUpdated(()=>{
            left()
        })


        return {
            ...toRefs(data)
        }
    },
    components:{ ReadOutlined }
}
</script>

<style lang="less" scoped>
@import url('@/assets/less/color.less');
@import url('@/assets/less/animation');

@height:60px;

.article{
    width: auto;
    height: auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 10px @bs-color;
    padding: 20px 30px;
    .title{
        font-size: 1.8rem;
        font-family: pfcg;
        cursor: pointer;
        font-size: 1.8rem;
        color: @f-color;
        font-family: pfcg;
    }
    .list{
        max-height: 600px;
        overflow-x: auto;
        .item{
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 40px;
            margin-top: 20px;
            .img{
                width: 25%;
                border-radius: 50%;
                overflow: hidden;
                width: @height;
                height: @height;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .content{
                width: 75%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                line-height: 40px;
                .title{
                    line-height: 30px;
                    overflow: hidden;
                    word-break: keep-all; // 不换行
                    text-overflow: ellipsis; // 超出隐藏
                    white-space: nowrap; // 强制在一行
                    transition: all 0.5s;
                    font-weight: 500;
                    &:hover{
                        color: @f-active;
                    }
                }
                .userInfo{
                    line-height: 24px;
                    font-size: 1.2rem;
                    span{
                        margin: 0 4px;
                    }
                }
            }
        }
        // 改变滚动条
        &::-webkit-scrollbar{
            width:10px;
            height:10px;
            /**/
          }
          .father::-webkit-scrollbar-track{
            background: @f-active;
            border-radius:2px;
          }
          .father::-webkit-scrollbar-thumb{
            background: @f-active;
            border-radius:10px;
          }
          .father::-webkit-scrollbar-thumb:hover{
            background: @f-active;
          }
          .father::-webkit-scrollbar-corner{
            background: @f-active;
          }
    }
}
</style>