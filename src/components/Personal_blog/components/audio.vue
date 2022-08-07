<template>
  <audio ref="audio" class="audio" :src="url">
    <!-- <source
      src="https://music.163.com/song/media/outer/url?id=1936525760.mp3"
      type="audio/mp3"
    />
    您的浏览器不支持audio -->
  </audio>
  <div class="progressBar">
    <div class="top">
      <div class="bg">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div
        class="content"
        :style="'width:' + activityWidth + 'px'"
        ref="nodeBar"
      >
        <div v-show="isShow" ref="nodeRadio">
          <p></p>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>
        {{ currentTime }}
      </div>
      <div>
        {{ totalDuration }}
      </div>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { reactive, toRefs } from "vue";
import {
  timeProcessing,
  hoverProgressBar,
} from "../hooks/musicProcessing";
export default {
  data() {
    return {
      isShow: false,
      audio: null,
    };
  },
  props: ['url','totalDuration','playModel'],
  setup(props) {
    const data = reactive({
      activityWidth: 0, // 进度条宽度
      timeId: null, // 定时器
      currentTime: "00:00" // 当前播放进度
    });
    // console.log(pro)
    return {
      ...toRefs(data),
    };
  },
  methods: {
    // 获取歌曲节点
    getAudioNode() {
      clearInterval(this.timeId);
      const audio = this.$refs.audio;
      this.audio = audio;
      this.bindEvent() // 绑定事件
    },
    // 播放或暂停回调
    playOrPause(value) {
      this.hoverPlay(value); // 控制进度条
      this.isShow = value;
      const audio = this.audio
      if (value) {
          audio.play();
          // 定时器 获取当前进度
          this.timeId = setInterval(() => {
            const currentTimes = audio.currentTime;
            this.currentTime = timeProcessing(currentTimes); // 计算出当前播放进度
            const num =  260 / (this.totalDuration.replace(/:/, "") * 1); // 计算出加载的长度
            this.mittBus.emit('startBgRotate',1)
            this.progressBarLoad(num)
          }, 1000);
        } else {
          audio.pause();
          clearInterval(this.timeId);
        }
    },
    hoverPlay(isShow) { // 初始化进度条
      const nodeBar = this.$refs.nodeBar; // 获取显示进度条节点
      hoverProgressBar(nodeBar, isShow);
    },
    progressBarLoad(num){ // 进度条加载
      this.activityWidth += num
    },
    progressBarReset(num){ // 进度条重置
      this.activityWidth = num
    },
    bindEvent(){ // 绑定事件
      const audio = this.$refs.audio;
      // 客户端开始请求数据
      audio.addEventListener('loadstart',()=>{
          // message.success('客户端开始请求数据...')
      })
      // 客户端正在请求数据
      audio.addEventListener('progress',()=>{
          // message.success('客户端正在请求数据...')
      })
      // 请求数据遇到错误
      audio.addEventListener('error',()=>{
          // message.success('请求数据遇到错误...')
      })
      // 客户端主动终止请求 （并非遇到错误）
      audio.addEventListener('abort',()=>{
          // message.success('客户端终止请求 - 并非遇到错误...')
      })
      // 网速失效
      audio.addEventListener('stalled',()=>{
          // message.success('网速失效...')
      })
      // 成功获取资源长度
      audio.addEventListener('loadedmetadata',()=>{
          // message.success('成功获取资源长度...')
      })
      // 成功获取资源长度
      audio.addEventListener('loadeddata',()=>{
          // message.success('成功获取资源长度2...')
      })
      // 等待数据并非错误
      audio.addEventListener('waiting',()=>{
          message.suc/cess('等待数据并非错误...')
      })
      // 但中间可能因为加载暂停
      audio.addEventListener('canplay',()=>{
          // message.success('可以播放 但中间可能因为加载暂停...')
      })
      // 可以播放 歌曲已经全部加载完毕
      audio.addEventListener('canplaythrough',()=>{
          // 关闭上一次定时器
          clearInterval(this.timeId);
          // message.success('可以播放 歌曲已经全部加载完毕...')
          this.playOrPause(true)
          this.progressBarReset(0) // 每次加载 都重置进度条
          this.mittBus.emit('resetBgRotate') // 重置图片旋转
      })
      
      // 播放时触发
      audio.addEventListener('play',()=>{
          // message.success('播放')
          // this.mittBus.emit("playOrPause",false);
      })
      // 暂停时触发
      audio.addEventListener('pause',()=>{
          // message.success('暂停')
          // this.mittBus.emit("playOrPause",true);
      })
      // 播放结束时触发
      audio.addEventListener('ended',()=>{
          // message.success('下一首')
          if(!this.playModel){
            this.audio.load() // 重新加载资源
            return
          }
          this.mittBus.emit('nextSong') // 触发下一首事件
          this.mittBus.emit("resetBgRotate"); //重置图片旋转
      })

      // 播放时间改变
      audio.addEventListener('timeupdate',()=>{
          // message.success('播放时间改变...')
      })
      // 播放速率改变
      audio.addEventListener('durationchange',()=>{
          // message.success('播放速率改变...')
      })
      // 资源长度改变
      audio.addEventListener('ratechange',()=>{
          // message.success('播放速率改变...')
      })
      // 音量改变
      audio.addEventListener('volumechange',()=>{
          // message.success('音量改变...')
      })
    }
  },
  mounted() {
    this.getAudioNode(); // 初始化音频
    this.hoverPlay(this.isShow); // 进度条初始化
    this.mittBus.on("playOrPause", this.playOrPause); // 定义播放或暂停事件
    this.mittBus.on("getAudioNode", this.getAudioNode); // 定义切歌事件
    this.mittBus.on("progressBarReset", this.progressBarReset); // 定义重置进度条事件
  },
  unmounted() {
    this.mittBus.off("playOrPause", this.playOrPause);
    this.mittBus.off("getAudioNode", this.getAudioNode);
    this.mittBus.off("progressBarReset", this.progressBarReset);
  },
}
</script>

<style lang="less" scoped>
.progressBar {
  transition: all 0.5;
  .top {
    position: relative;
    width: 260px;
    .bg {
      transition: all 0.5;
      position: absolute;
      width: 100%;
      position: relative;
      box-shadow: 27px 27px 53px rgba(@filmColorRight, 1),
        -27px -27px 53px rgba(@filmColorLeft, 1);
      p {
        transition: all 0.5;
        position: absolute;
        left: 0;
        right: 0;
        height: 4px;
        background: rgba(@primaryColor, 1);
      }
    }
    .content {
      transition: all 0.5s;
      position: absolute;
      height: 4px;
      background: rgba(@primaryTextColor, 1);
      div {
        cursor: pointer;
        position: absolute;
        top: -2.8px;
        right: -3.8px;
        width: 10px;
        height: 10px;
        transition: all 0.5s;
        background: rgba(@primaryTextColor, 1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          width: 3px;
          height: 3px;
          transition: all 0.5s;
          background: rgba(@primaryColor, 1);
          border-radius: 50%;
          margin: 0px;
        }
      }
    }
  }
  .footer {
    font-size: 0.5rem;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
