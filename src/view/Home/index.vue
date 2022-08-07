<template>
  <Banner :dataList="bannerList" width="100%" height="700px" effect="fade"></Banner>
  <div class="content">
    <div class="title">
        关于本站
    </div>
    <a-row v-for="(item,index) in listData" :key="index" justify="center" align="top" :gutter="{ xs: 0, sm: 8, md: 8, lg: 32 }">
        <a-col v-for="(it,i) in item" :key="i" :xs="24" :sm="24" :md="24 / item.length" :xl="24 / item.length" flex>
            <div class="item" id="top">
                <Icon id="icon">
                    <template #component>
                        {{it.icon}}
                    </template>
                </Icon>
                <div class="title">
                    {{it.title}}
                </div>
                <div class="describe">
                    {{it.describe}}
                </div>
            </div>
        </a-col>
    </a-row>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import {Html5Outlined} from '@ant-design/icons-vue' 
import { getIcon } from '@/hooks/useHome'
import Icon from '@ant-design/icons-vue';
import {reactive, toRefs, onMounted, getCurrentInstance, onUpdated} from 'vue'
import {highlyAdaptive} from '@/hooks/useHeader'
import {topAnimation} from '@/hooks/useAnimation'
export default {
    setup(props) {
        highlyAdaptive()
        topAnimation()
        const {proxy} = getCurrentInstance()
        // 数据
        let data = reactive({
            bannerList:[],
            listData:[]
        })

        // 方法
        let methods = reactive({
            getBannerList(){
                proxy.$api.getBannerList().then(res => {
                    data.bannerList = res.data
                })
            },
            getListData(){
                proxy.$api.getListData().then(res => {
                    data.listData = res.data
                })
            }
        })
        onMounted(()=>{
            methods.getBannerList()
            methods.getListData()
        })
        onUpdated(()=>{
            getIcon()
            topAnimation()
        })

        return {
            ...toRefs(data)
        }
    },
    components:{Banner,Html5Outlined,Icon}
}
</script>

<style lang="less" scoped>
@import url('@/assets/less/color.less');
@import url('@/assets/less/animation.less');

@h:30px;

.content{
    max-width: 1200px;
    margin: 0 auto;
    .title{
        font-size: 4.8rem;
        font-weight: 800;
        text-align: center;
        margin: @h 0;
    }
    .item{
        width: 100%;
        height: auto;
        padding: 20px 30px;
        border-radius: 2%;
        box-shadow: 0px 0px 30px @bs-color;
        margin-bottom: @h;
        transition: all 0.5s;
        #icon{
            width: 50px;
            height: 50px;
        }
        .title{
            transition: all 0.5s;
            text-align: left;
            font-family: fontOne;
            margin: 4px 0;
            font-size: 4.8rem;
        }
        .describe{
            text-align: left;
            font-family: pfcg;
            font-size: 1.8rem;
        }
        &:hover{
            background-color: @f-active;
            color: @bg-color;
        }
    }
}
</style>