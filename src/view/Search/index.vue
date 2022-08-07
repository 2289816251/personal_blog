<template>
  <div class="class" v-if="dataList.length >= 1">
    <div class="menu">
      <div class="title">
        搜索结果 {{keyword}}
      </div>
      <div>
        <a-input-search
        v-model:value="searchValue"
        placeholder="搜索"
        enter-button
        @search="onSearch"
        />
      </div>
    </div>
    <a-row justify="left" align="top" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col :xs="24" :sm="24" :md="12" :xl="8" v-for="(item,index) in dataList" :key="index" flex>
            <Card :data="item" toggleClass="smallLabels"></Card>
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
import Card from '@/components/Card'
import {headerHeight} from '@/hooks/useHeader'
import {InputSearch,message} from 'ant-design-vue'
import {reactive, toRefs, getCurrentInstance, watch} from 'vue'
export default {
    props: ['keyword'],
    setup(props){
        headerHeight()

        const {proxy} = getCurrentInstance()

        let data = reactive({
            dataList:[], // 数据
            index:1, // 索引
            loading:true, // 加载状态
            searchValue:'' // 搜索内容
        })

        let methods = reactive({
            // 搜索
            getSearchData(value){
                let keyword = value ? value : props.keyword
                proxy.$api.getArticleBySearch(keyword,data.index).then((res)=>{
                    data.dataList = []
                    if(res.code == 200){
                        res.data.forEach(item => {
                            if(item == null) return data.loading = false
                            data.dataList.push(item)
                        })
                    }
                })
            },
            // 搜索框回调
            onSearch(){
                if(data.searchValue == ''){
                    message.warning('请输入搜索内容')
                    return
                }
                // 跳转到搜索页面
                proxy.$router.replace({path:`/search/${data.searchValue}`})
                // 清除搜索内容
                data.searchValue = ''
            },
            getMore(){ // 加载更多回调
                data.index++
                methods.getSearchData()
            }
        })

        // 监听路由传递的值的变化
        watch(props,(newValue,oldVlaue)=>{
            methods.getSearchData(newValue.keyword)
        },{deep:true})

        methods.getSearchData()

        return {
            ...toRefs(data),
            ...toRefs(methods)
        }
    },
    components:{
        Card,
        AInputSearch:InputSearch
    }
}
</script>

<style lang="less" scoped>
@import url('@/assets/less/color.less');
.class{
  max-width: 1200px;
  margin: 0 auto;
  padding-top: @navHeight;
  .menu{
    top: 80px;
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      font-size:2.4rem;
      font-weight: bold;
      font-family: fontOne;
    }
  }
  &>.ant-row{
    padding: 30px 0;
    .ant-col{
        margin-bottom: 32px;
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