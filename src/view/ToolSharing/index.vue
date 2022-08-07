<template>
  <div class="toolSharing">
    <!-- 导航 -->
    <div class="header">
      头部
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 左边 -->
      <div class="left">
        <a-anchor :target-offset="targetOffset" :offsetTop="offsetTop">
          <a-anchor-link :href="'#' + pinin[index]" :title="item.title" @click.prevent="0" v-for="(item,index) in navList" :key="index" />
        </a-anchor>
      </div>
      <!-- 右边 -->
      <div class="right" v-if="navList">
        <div class="list" :id="pinin[index]" v-for="(item,index) in navList" :key="index">
          <div class="title">
            {{item.title}}
          </div>
          <div class="content" v-if="item.children.length >= 1">
            <div class="item" v-for="(it,i) in item.children" :key="i">
              <div class="img">
                <img :src="it.imgUrl" alt="!">
              </div>
              <div class="content">
                <div class="title">
                  <a :href="it.url" target="_blank">{{it.title}}</a>
                </div>
                <div class="describe">
                  {{it.describe}}
                </div>
              </div>
            </div>
          </div>
          <div class="noData" v-else>
            <a-empty description="暂无数据"/>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {headerHeight} from '@/hooks/useHeader'
import {Anchor,AnchorLink} from 'ant-design-vue';
import { computed, onMounted, reactive, toRefs, getCurrentInstance } from 'vue';
import pinyin from 'pinyin'
import {setHeight} from '@/hooks/useHeader'
export default {
  setup(props){
    const {proxy} = getCurrentInstance()

    headerHeight()
    
    let data = reactive({
      navList:[],
      targetOffset:0, // 锚点距离顶部的距离
      offsetTop:0, // 顶部高度
    })

    let methods = reactive({
      getData(){
        proxy.$api.getToolSharing().then(res=>{
          if(res.code == 200){
            data.navList = res.data
          }
        })
      }
    })

    // 根据名字计算拼音
    data.pinin = computed(()=>{
      let value = []
      data.navList.forEach(e=>{
        const arr =  pinyin(e.title,{heteronym: false})
        const str = arr.join('')
        value.push(str)
      })
      return value
    })

    methods.getData()

    onMounted(()=>{
      data.targetOffset = setHeight()
      data.offsetTop = setHeight()
    })

    return {
      ...toRefs(data)
    }

  },
  components:{AAnchor:Anchor, AAnchorLink:AnchorLink}
}
</script>

<style lang="less" scoped>

@import url('@/assets/less/color.less');

.toolSharing{
  padding-top: @navHeight;
  max-width: 1200px;
  margin: 0 auto;
  .header{
    padding: 20px 0;
  }
  .content{
    display: flex;
    align-items: top;
    .left{
      margin-right: 30px;
    }
    .right{
      width: 100%;
      .list{
        width: 100%;
        height: auto;
        padding: 20px 30px;
        box-shadow: 0px 0px 6px @bs-color;

        &>.title{
          font-size: 1.8rem;
          font-family: pfcg;
          font-weight: bold;
        }

        &>.content{
          display: flex;
          flex-wrap: wrap;
          .item{
            display: flex;
            margin-top: 20px;
            align-items: center;
            width: 25%;
            padding-right: 10px;
            .img{
              width: 20%;
              margin-right: 6px;
              img{
                width: 50px;
                height: 50px;
              }
            }
            &>.content{
              width: 80%;
              display: flex;
              flex-direction: column;
              align-items: left;
              .title{
                font-size: 1.6rem;
                overflow: hidden;
                word-break: keep-all; // 不换行
                text-overflow: ellipsis; // 超出隐藏
                white-space: nowrap; // 强制在一行
              }
              .describe{
                font-size: 1.2rem;
                overflow: hidden;
                word-break: keep-all; // 不换行
                text-overflow: ellipsis; // 超出隐藏
                white-space: nowrap; // 强制在一行
              }
            }
            
          }
        }

        &:not(:last-child){
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>