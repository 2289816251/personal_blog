<template>
  <div class="class" v-if="dataList.length >= 1">
    <div class="menu">
      <div class="title">
        {{key}}
      </div>
      <Select :dataList="['升序','降序']" :default="sort=='desc' ? '升序' : '降序'" @change="chenge" />
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
import Select from '@/components/Select'
import {headerHeight} from '@/hooks/useHeader'
import {reactive, toRefs, getCurrentInstance} from 'vue'
export default {
  setup(props){
    headerHeight()
    const {proxy} = getCurrentInstance()
    let data = reactive({
      dataList:[],
      index:1,
      key:proxy.$route.name,
      sort:'desc',
      loading:true
    })

    let methods = reactive({
      getFrontEndData(clear){
        proxy.$api.getFrontEndData('html',data.sort,data.index).then((res)=>{
          if(res.code == 200){
            // 判断是否需要清楚数据
            if(clear) data.dataList = []
            res.data.forEach(item => {
                if(item == null) return data.loading = false
                data.dataList.push(item)
            })
          }
        })
      },
      getMore(){
        data.index++
        methods.getFrontEndData()
      },
      chenge(conetext){
        const sort =  conetext.target.value
        data.sort = sort == '升序' ? 'desc' : 'asc'
        data.index = 1
        methods.getFrontEndData(true)
      }
    })

    methods.getFrontEndData()

    return {
      ...toRefs(data),
      ...toRefs(methods)
    }
  },
  components:{ Card, Select }
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