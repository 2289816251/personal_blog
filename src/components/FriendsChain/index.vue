<template>
  <div class="FriendsChain" id="left">
    <div class="title">
        友情链接
        <team-outlined :style="{fontSize: size + 'px'}"/>
    </div>
    <div class="list" v-if="dataList.length > 0">
        <div class="item" v-for="(item,index) in dataList" :key="index">
            <a :href="item.url" target="_blank">{{item.title}}</a>
        </div>
    </div>
    <div class="noData" v-else>
        <a href="#" @click.prevent="0">暂无友链...</a>
    </div>
  </div>
</template>

<script>
import {TeamOutlined} from '@ant-design/icons-vue'
import {reactive, toRefs, getCurrentInstance, onUpdated} from 'vue'

import {left} from '@/hooks/useAnimation'
export default {
    setup(props) {

        const {proxy} = getCurrentInstance()

        let data = reactive({
            size:18,
            dataList:[]
        })

        let methods = reactive({
            getFriendsChain(){
                proxy.$api.getFriendsChain().then((res)=>{
                    if(res.code == 200){
                        data.dataList = res.data
                    }
                })
            }
        })

        onUpdated(()=>{
            left()
        })

        methods.getFriendsChain()

        return {
            ...toRefs(data)
        }
    },
    components:{ TeamOutlined }
}
</script>

<style lang="less" scoped>
@import url('@/assets/less/color.less');
@import url('@/assets/less/animation');
@height:30px;
.FriendsChain{
    width: auto;
    height: auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 10px @bs-color;
    padding: 20px 30px;
    .title{
        cursor: pointer;
        font-size: 1.8rem;
        color: @f-color;
        font-family: pfcg;
    }
    .list{
        margin-top: 4px;
        .item{
            line-height: @height;
            font-size: 1.4rem;
            font-family: pfcg;
            overflow: hidden;
            word-break: keep-all; // 不换行
            text-overflow: ellipsis; // 超出隐藏
            white-space: nowrap; // 强制在一行
        }
    }
    .noData{
        margin-top: 4px;
        text-align: center;
        a{
            display: block;
            line-height: @height;
            font-size: 1.4rem;
            font-family: pfcg;
            overflow: hidden;
            word-break: keep-all; // 不换行
            text-overflow: ellipsis; // 超出隐藏
            white-space: nowrap; // 强制在一行
        }
    }
}
</style>