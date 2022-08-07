<template>
  <div class="aboutMe">
    <!-- 背景 -->
    <div class="top">
      <div class="img">
        <img src="@/assets/images/aboutMe/bg.jpg" alt="加载失败">
      </div>
      <div class="bg">

      </div>
      <div class="content">
        <div class="left" title="otherInfo">
          {{otherInfo}}
        </div>
        <div class="center">
          <div class="top cssanimation typing">
            Hello
          </div>
          <div class="center">
            I Am <span class="cssanimation leBlurInRight sequence">Capricornus</span>.
          </div>
          <div class="footer cssanimation leWaterWave sequence">
            Welcome to my personal blog
          </div>
        </div>
        <div class="right" title="ID">
          {{uuid}}
        </div>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="content">
      <a-row justify="center" align="middle" :gutter="{ xs: 0, sm: 0, md: 16, lg: 32 }">
        <!-- 左边 -->
        <a-col :xs="24" :sm="24" :md="10" :xl="8" flex>
          <div class="avatar" id="right">
            <div class="content">
              <!-- 头像 -->
              <img :src="dataList.avatar" alt="加载失败">
            </div>
          </div>
        </a-col>
        <!-- 右边 -->
        <a-col :xs="24" :sm="24" :md="14" :xl="16" flex>
          <div class="content" id="left">
            <div class="top">
              <div class="one">
                Hello,
              </div>
              <div class="two">
                I am a student
              </div>
              <!-- 介绍 -->
              <div class="introduce">
                {{dataList.introduce}}
              </div>
            </div>
            <hr>
            <div class="footer">
              <div class="list">
                <div class="item" v-for="(item,index) in dataList.userInfo" :key="index">
                  <div class="label">
                    {{item.label}}:
                  </div>
                  <div class="value" :title="item.value">
                    <a :href="item.url" target="_blank" v-if="item.url">{{item.value}}</a>
                    <span v-else>{{item.value}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- 我的技能 -->
    <div class="skill">
      <div class="title">
        My Skill
      </div>
      <div class="list">
        <div class="item" id="top" v-for="(item,index) in dataList.skill" :key="index">
          <div class="label">
            {{item.label}}:
          </div>
          <div class="value">
            <a-progress
              :stroke-color="{
                from: '#199bdb',
                to: '#157fb4',
              }"
              :percent="item.value"
              status="active"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {highlyAdaptive} from '@/hooks/useHeader'
import {topAnimation , leftAnimation , rightAnimation} from '@/hooks/useAnimation'
import { reactive, toRefs, getCurrentInstance } from 'vue'
import {Progress} from 'ant-design-vue'
import {useUserStore} from '@/store/userInfo'
import {storeToRefs} from 'pinia'
export default {
  setup(props){
    highlyAdaptive()
    topAnimation()
    leftAnimation()
    rightAnimation()

    // 拿到状态管理数据
    const userStore = useUserStore()
    // 解构数据
    const {uuid,otherInfo} = storeToRefs(userStore)

    const {proxy} = getCurrentInstance()

    let data = reactive({
      dataList:[],
      uuid:uuid.value,
      otherInfo:otherInfo.value
    })
  
    let methods = reactive({
      getAboutMe(){
        proxy.$api.getAboutMe().then(res=>{
          data.dataList = res.data
        })
      }
    })

    methods.getAboutMe()

    return {
      ...toRefs(data)
    }
  },
  components:{ AProgress:Progress }
}
</script>

<style lang="less" scoped>
@import url('@/assets/less/color.less');
@import url('@/assets/less/animation.less');

.aboutMe{
  .top{
    position: relative;;
    .img{
      width: 100%;
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: auto;
        height: auto;
      }
    }
    .bg{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      right: 0;
      background-color: black;
      opacity: 0.5;
    }
    .content{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: @f-color2;
      .left{
        cursor: pointer;
        transform: rotateZ(90deg) !important;
        transform-origin: center !important;
        font-family: fontThree;
      }
      .center{
        cursor: pointer;
        text-align: center;
        font-size: 6.4rem;
        color: @f-color3;
        display: flex;
        flex-direction: column;
        align-items: center;
        &>.top{
          width: 160px;
          display: block;
          font-family: pfcg;
          font-weight: bold;
        }
        &>.center{
          font-family: pfcg;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          span{
            font-family: fontThree;
            color: @f-color2;
            margin: 0 20px;
            transition: all 0.5s;
            &:hover{
              color: @f-active;
            }
          }
        }
        &>.footer{
          padding: 0 !important;
          font-family: pfcg;
          font-size: 3.2rem;
          &::before{
            content: '————';
          }
          &::after{
            content: '————';
          }
        }
      }
      .right{
        font-family: fontThree;
        cursor: pointer;
        transform: rotateZ(-90deg) !important;
        transform-origin: center !important;
      }
    }
  }
  &>.content{
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // 头像
    .avatar{
      width: 360px;
      height: 400px;
      border: 1px solid #dfdfdf;
      padding: 16px;
      .content{
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    // 内容
    .content{
      .top{
        .one{
          font-size: 4.8rem;
          font-family: fontOne;
        }
        .two{
          font-size: 3.2rem;
          font-family: fontThree;
        }
        .introduce{
          font-size: 1.8rem;
          font-family: pfcg;
        }
      }
      hr{
        margin: 10px 0 ;
        border: 1px solid @bs-color;
      }
      .footer{
        padding: 0px !important;
        .list{
          display: flex;
          juspify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          .item{
            width: 48%;
            display: flex;
            align-items: center;
            line-height: 40px;
            overflow: hidden;
            word-break: keep-all; // 不换行
            text-overflow: ellipsis; // 超出隐藏
            white-space: nowrap; // 强制在一行
            .label{
              font-size: 1.8rem;
              font-family: fontThree;
              margin-right: 10px;
            }
            .value{
              font-size: 1.8rem;
              font-family: pfcg;
              overflow: hidden;
              word-break: keep-all; // 不换行
              text-overflow: ellipsis; // 超出隐藏
              white-space: nowrap; // 强制在一行
            }
          }
        }
      }
    }
  }
  .skill{
    max-width: 1200px;
    margin: 0 auto;
    .title{
      font-size: 4.8rem;
      font-family: fontOne;
      text-align: center;
      margin-bottom: 20px;
    }
    .list{
      .item{
        display: flex;
        align-items: center;
        .label{
          width: 10%;
          font-size: 1.8rem;
          font-family: fontThree;
        }
        .value{
          width: 90%;
        }
      }
    }
  }
}

/* 打字效果 */
.typing {
    width: 160px;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid @f-active;
    animation: typing 2s steps(12, end), cursor .2s steps(12, end) infinite;
}
@keyframes typing {
    from { width: 0 }
}
@keyframes cursor {
    50% { border-color: transparent }
}
</style>