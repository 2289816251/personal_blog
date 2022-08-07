<template>
    <div class="recommend" v-if="dataList.length >= 1">
        <a-row justify="left" align="top" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
            <a-col :xs="24" :sm="24" :md="18" :xl="16"  flex>
                <a-row justify="left" align="top" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
                    <a-col :xs="24" :sm="24" :md="12" :xl="12" v-for="(item,index) in dataList" :key="index" flex>
                        <Card :data="item"></Card>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :xs="24" :sm="24" :md="6" :xl="8" flex>
                <!-- 推荐文章 -->
                <div class="side">
                    <Article />
                </div>
                <!-- 友链 -->
                <div class="side">
                    <FriendsChain />
                </div>
            </a-col>
        </a-row>
        <div class="loading">
            <a class="data" v-show="loading" href="#" @click.prevent="getMore">加载更多</a>
            <a class="noData" v-show="!loading" href="#" @click.prevent="0">暂时没有了/(ㄒoㄒ)/~~</a>
        </div>
    </div>
    <div class="noDataEmpty" v-else>
        <a-empty description="暂无数据"/>
    </div>
</template>

<script>
import {headerHeight} from '@/hooks/useHeader'
import {reactive, toRefs, getCurrentInstance} from 'vue'
import Card from '@/components/Card'

import FriendsChain from '@/components/FriendsChain'
import Article from '@/components/Article'
export default {
    setup(props) {
        headerHeight()
        const { proxy } = getCurrentInstance()
        
        let data = reactive({
            dataList: [],
            index: 1,
            loading:true
        })

        let methods = reactive({
            getData() {
                data.loading = true
                proxy.$api.getRecommendData(data.index > 1 ? data.index : '').then(res => {
                    res.data.forEach(item => {
                        if(item == null) return data.loading = false
                        data.dataList.push(item)
                    })
                })
            },
            getMore() {
                data.index++
                methods.getData()
            }
        })

        methods.getData()


        return {
            ...toRefs(data),
            ...toRefs(methods)
        }
    },
    components:{ Card, FriendsChain, Article }
}
</script>

<style lang="less" scoped>
@import url('@/assets/less/color.less');
.recommend{
    padding-top: @navHeight;
    max-width: 1200px;
    margin: 0 auto;
    &>.ant-row{
        padding: 30px 0;
        .ant-col{
            margin-bottom: 32px;
        }
    }
    .side{
        &:not(:last-child){
            margin-bottom: 30px;
        }
    }
    .loading{
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 30px;
        .data{
            background-color: @f-active;
            padding: 8px 14px;
            color: @f-color2;
            font-size: 1.6rem;
            border-radius: 4px;
            transition: all 0.5s;
            &:hover{
                background-color: @f-hover;
            }
        }
    }
}
</style>