<template>
  <div class="music">
    <div class="content">
      <div class="top">
        <div class="left">
          <div class="title">{{musicList[index].title}}</div>
          <div class="describe">{{musicList[index].describe || '欢迎反馈'}}</div>
        </div>
        <div class="right"></div>
      </div>
      <hr>
      <div class="center">
        <div class="icon">
          <!-- 列表循环 -->
          <div title="列表循环" :class="{active:playModel == true}" @click="togglePlay(true)">
            <svg t="1658217999333" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1208" width="30" height="30"><path d="M286.95 286.95h450.1v134.61l178.78-178.78L737.05 64v134.61H198.61v269.22h88.34V286.95z m450.1 450.1h-450.1V602.44L108.17 781.22 286.95 960V825.39h538.44V556.17h-88.34v180.88z" p-id="1209"></path></svg>
          </div>
          <!-- 单曲循环 -->
          <div title="单曲循环" :class="{active:playModel == false}" @click="togglePlay(false)">
            <svg t="1658218105577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1353" width="30" height="30"><path d="M286.95 286.95h450.1v134.61l178.78-178.78L737.05 64v134.61H198.61v269.22h88.34V286.95z m450.1 450.1h-450.1V602.44L108.17 781.22 286.95 960V825.39h538.44V556.17h-88.34v180.88z m-180.88-90.44V377.39H512l-90.44 44.17v46.27h67.3v178.78h67.31z" p-id="1354"></path></svg>
          </div>
          <!-- 歌曲列表 -->
          <div title="歌曲列表" :class="{active:isShowMusicList}" @click="isShowMusicList = !isShowMusicList">
            <svg t="1658217623306" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7674" width="30" height="30"><path d="M838.99432863 162.40722482l-186.33127437 38.02037807c-13.51137403 2.82796201-23.25213204 14.61113702-23.25213205 28.43672906v412.09690783c0 23.09502305-15.86800901 43.20497508-38.49170507 48.54668107L534.04575904 702.86218588c-34.24976206 8.01255901-61.27251012 37.39194207-61.42961915 72.58435814-0.31421799 48.07535409 44.30473808 83.58198817 90.96611119 72.74146715l29.85071007-6.91279599c48.70379009-11.31184801 83.26777017-53.73127811 85.62440516-103.22061322h0.47132701v-372.34833075c0-10.84052103 7.69834101-20.26706103 18.38175304-22.46658704l150.35331329-30.63625506c10.84052103-2.19952601 18.69597103-11.78317502 18.69597104-22.93791404v-104.47748521c0.15710901-14.76824603-13.35426503-25.76587604-27.96540206-22.78080504zM166.72491631 255.88708001h375.96183773v33.14999904H166.72491631zM166.72491631 387.38731327h375.96183773v33.14999905H166.72491631z" p-id="7675"></path><path d="M166.72491631 518.88754654h375.96183773V552.03754558H166.72491631zM166.72491631 650.3877798h202.98482839v33.14999904H166.72491631z" p-id="7676"></path></svg>
          </div>
          <!-- 音量 -->
          <div title="音量">
            <svg t="1658217802599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9558" width="30" height="30"><path d="M789.904 256.006a35.337 35.337 0 0 0-26.856-4.837 35.348 35.348 0 0 0-22.293 15.745c-10.69 16.753-6.085 38.982 10.384 50.116 3.845 2.61 95.493 66.021 95.493 223.695 0 158.078-87.909 221.529-91.385 223.917-16.537 11.266-20.958 33.723-9.931 50.414a35.583 35.583 0 0 0 22.707 15.351 35.58 35.58 0 0 0 26.885-5.339c5.043-3.363 123.277-85.635 123.277-284.382 0-199.051-123.017-281.284-128.281-284.68M678.54 362.663a35.357 35.357 0 0 0-27.125-1.288 35.378 35.378 0 0 0-20.041 18.319c-8.474 17.905-1.265 39.308 16.321 48.436 2.279 1.192 55.866 29.426 55.866 109.94 0 85.97-50.116 114.463-51.758 115.397-17.756 9.141-24.891 30.84-16.023 48.732a35.783 35.783 0 0 0 48.025 16.286c3.739-1.943 91.272-47.911 91.272-180.375 0-127.906-92.615-173.577-96.536-175.481M515.796 800.753l-74.695-67.89-122.264-111.176a37.404 37.404 0 0 0-25.17-9.71l-113.979 0.034-0.37-239.827h150.05a37.423 37.423 0 0 0 32.001-9.072l79.698-72.488 74.688-67.89v578.019h0.041z m44.361-678.294c-9.147-4.028-33.273-10.792-59.747 13.295l-59.31 53.928-118.604 107.814H179.318c-41.107 0.165-74.341 33.546-74.318 74.653v239.862c0 41.16 33.346 74.655 74.318 74.655h99.932L441.1 833.803l59.383 53.963c14.976 13.597 29.165 17.403 40.334 17.403 8.621 0 15.494-2.279 19.454-4.034 9.112-4.029 30.246-17.25 30.246-52.99v-672.84c0-24.685-11.35-44.406-30.36-52.846z m0 0" p-id="9559"></path></svg>
          </div>
        </div>
        <div class="audio">
          <div class="audio_music" :class="{shake:!isShowMusicList}" v-show="!isShowMusicList">
            <Audio :url="musicList[index].url" :totalDuration="musicList[index].totalDuration" :playModel="playModel"></Audio>
          </div>
          <div class="list" :class="{shake:isShowMusicList}" v-show="isShowMusicList">
            <ul>
              <li :class="{active:index == i}" v-for="(item,i) in musicList" :key="i" @click="clickToggleMusic(i)">{{item.title}}<span>-</span>{{item.describe}}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 底部控制图标 -->
      <div class="footer">
        <!-- 上一首 -->
        <div class="leftArrow" @click="previousSong">
          <span></span>
        </div>
        <!-- 播放或暂停 -->
        <div class="playOrPause" @click="playOrPause">
          <div class="play" v-show="!isShowPlayOrPause">
            <span></span>
            <span></span>
          </div>
          <div class="pause" v-show="isShowPlayOrPause">
            <span></span>
          </div>
        </div>
        <!-- 下一首 -->
        <div class="rightArrow" @click="nextSong">
          <span></span>
        </div>
      </div>
    </div>
    <div class="image">
      <div class="bg" :style="'transform: rotateZ('+bgRotate+'deg)'">
        <div class="music_bg">
          <img :src="musicList[index].imgUrl ? musicList[index].imgUrl : '../assets/images/music_bg.jpg'" alt="加载失败" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {storeToRefs} from 'pinia'
import { getCurrentInstance, onUnmounted, reactive, toRefs } from "vue";
import Audio from "./audio.vue";
import { SidebarStore } from '../pinia';
export default {
  setup() {
    const {proxy}  = getCurrentInstance()

    const data = reactive({
      musicList:[], // 存储音乐列表
      currentlyPlaying:{}, // 当前播放列表
      index:0, // 索引
      isShowPlayOrPause: false, // 控制播放和暂停
      playModel:true, // 播放模式 默认列表循环
      isShowMusicList:false, // 是否显示音乐列表
      bgRotate:0, // 背景旋转
      playOrPause() { // 播放或暂停回调
        proxy.mittBus.emit("playOrPause", data.isShowPlayOrPause);
        data.isShowPlayOrPause = !data.isShowPlayOrPause;
      },
      controlPlayOrPause(bol){ // 控制播放或暂停按钮
        data.isShowPlayOrPause = bol
      },
      nextSong(){ // 下一首回调
        if(data.index >= data.musicList.length-1){
            data.index = 0
            proxy.mittBus.emit("getAudioNode");
            return
        }
        data.index++
      },
      previousSong(){ // 上一首回调
        if(data.index <= 0){
            data.index = data.musicList.length - 1
            proxy.mittBus.emit("getAudioNode");
            return
        }
        data.index--
      },
      startBgRotate(num){ // 背景开始旋转
        data.bgRotate += num
      },
      resetBgRotate(){ // 重置背景
        data.bgRotate = 0
      },
      togglePlay(bol){ // 切换播放模式
        data.playModel = bol
      },
      clickToggleMusic(i){ // 点击切换音乐
        if(data.index == i) return
        data.index = i
        data.isShowPlayOrPause = false
      }
    });

    // 从pinia获取数据
    const Sidebar = SidebarStore()
    const {dataList} = storeToRefs(Sidebar)
    data.musicList = dataList.value

    // 定义事件
    proxy.mittBus.on("nextSong", data.nextSong); // 定义播放结束切换下一首事件
    proxy.mittBus.on("startBgRotate", data.startBgRotate); // 定义背景开始旋转事件
    proxy.mittBus.on("resetBgRotate", data.resetBgRotate); // 定义重置背景旋转事件
    proxy.mittBus.on("playOrPause", data.controlPlayOrPause); // 控制播放或暂停按钮

    onUnmounted(()=>{ // 卸载钩子
      proxy.mittBus.off("nextSong", data.nextSong);
      proxy.mittBus.off("startBgRotate", data.startBgRotate);
      proxy.mittBus.off("resetBgRotate", data.resetBgRotate);
      proxy.mittBus.off("playOrPause", data.controlPlayOrPause);
    })
    return {
      ...toRefs(data),
    };
  },
  components: { Audio },
};
</script>

<style lang="less" scoped>
.music {
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s;
  overflow: hidden;
  padding-left: 10px;
  .content {
    height: 100%;
    margin-right: 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    hr{
      border: 1px solid rgba(@primaryTextColor, 0.1);
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 260px;
        .title {
            overflow: hidden;
            word-break: keep-all; // 不换行
            text-overflow: ellipsis; // 超出隐藏
            white-space: nowrap; // 强制在一行
            width: 100%;
            font-size: 18px;
        }
        .describe {
          font-size: 12px;
          opacity: 0.5;
        }
      }
    }
    .center {
      width: 100%;
      height: 100%;
      .icon{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        div{
          cursor:pointer;
          transition: all 0.5s;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          .icon{ // 单曲循环
            transition: all 0.5s;
            margin: 0;
            fill: rgba(@primaryTextColor, 1);
          }
        }
        .active{
          .icon{
            fill: @active;
          }
        }
      }
      .audio{
        // .music{}
        .list{
          ul{
            height: 120px;
            overflow: auto;
            li{
              cursor:pointer;
              padding: 0 5px;
              line-height: 50px;
              overflow: hidden;
              word-break: keep-all; // 不换行
              text-overflow: ellipsis; // 超出隐藏
              white-space: nowrap; // 强制在一行
              width: 100%;
              font-size: 16px;
            }
            .active{
              color: @active;
            }
          }
          ul::-webkit-scrollbar{
            width:10px;
            height:10px;
            /**/
          }
          .father::-webkit-scrollbar-track{
            background: rgba(@filmColorRight,1);
            border-radius:2px;
          }
          .father::-webkit-scrollbar-thumb{
            background: rgba(@filmColorLeft,1);
            border-radius:10px;
          }
          .father::-webkit-scrollbar-thumb:hover{
            background: rgba(@filmColorLeft,1);
          }
          .father::-webkit-scrollbar-corner{
            background: rgba(@filmColorRight,1);
          }
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .leftArrow {
        cursor: pointer;
        span {
          width: 20px;
          height: 20px;
          background: rgba(@primaryTextColor, 1);
          transform: rotateZ(-45deg);
          border-radius: 15% 85% 75% 25% / 15% 25% 75% 85%;
        }
      }
      .playOrPause {
        cursor: pointer;
        transition: all 0.5s;
        .play {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            transition: all 0.5s;
            width: 6px;
            height: 26px;
            border-radius: 10px;
            margin: 6px;
            background: rgba(@primaryTextColor, 1);
          }
        }
        .pause {
          transition: all 0.5s;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 4px solid rgba(@primaryTextColor, 1);
          border-radius: 50%;
          padding: 6px;
          span {
            margin-right: 1px;
            transition: all 0.5s;
            width: 14px;
            height: 14px;
            transform: rotateZ(135deg);
            background: rgba(@primaryTextColor, 1);
            border-radius: 15% 85% 75% 25% / 15% 25% 75% 85%;
          }
        }
      }
      .rightArrow {
        cursor: pointer;
        span {
          width: 20px;
          height: 20px;
          transform: rotateZ(135deg);
          background: rgba(@primaryTextColor, 1);
          border-radius: 15% 85% 75% 25% / 15% 25% 75% 85%;
        }
      }
      & > div {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 50px;
        transition: all 0.5s;
        line-height: 50px;
        border-radius: 50%;
        background: rgba(@primaryColor, 1);
        box-shadow: 27px 27px 53px rgba(@filmColorRight, 1),
          -27px -27px 53px rgba(@filmColorLeft, 1);
      }
      & > div > span {
        transition: all 0.5s;
      }
    }
    & > div:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  .image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: all 0.5s;
    background: rgba(@primaryColor, 1);
    box-shadow: 27px 27px 53px rgba(@filmColorRight, 1),
      -27px -27px 53px rgba(@filmColorLeft, 1);
    .bg {
      transition: all 0.5s linear;
      background: url("../assets/images/Vinyl_Records.png");
      background-size: 110%;
      background-position: center;
      width: 170px;
      height: 170px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .music_bg {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 120px;
          height: 120px;
        }
      }
    }
  }
  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  @keyframes shake {
    0%{
      opacity: 0;
      transform: translateX(20px);
    }
    100%{
      opacity: 1;
      transform: translateX(0px);
    }
  }
}
</style>
