<template>
  <!-- 音乐播放器 -->
  <Suspense>
    <template v-slot:default>
      <Personal_blog position="left" location="100" :dataList="musicList"/>
    </template>
    <template v-slot:fallback>
      <div class="musciHint">
        播放器加载中...
      </div>
    </template>
  </Suspense>
  <!-- 头部导航 -->
  <Header :navData="navList" :highlyAdaptive="$route.meta.highlyAdaptive"></Header>
  <!-- 内容展示区 -->
  <div class="main">
    <router-view></router-view>
  </div>
  <!-- 底部 -->
  <Footer></Footer>
  <!-- 回到顶部组件 -->
  <BackTop/>
</template>

<script>                                                         
import {defineAsyncComponent,getCurrentInstance, reactive} from 'vue'
import Header from '@/components/Header' 
import Footer from '@/components/Footer'
import BackTop from '@/components/BackTop'
const Personal_blog = defineAsyncComponent(()=>import ('@/components/Personal_blog'))
export default {
  name: 'App',
  data() {
    return {
      musicList:[],
      navList:[] // 导航列表
    }
  },
  setup(props) {

    const {proxy} = getCurrentInstance()

    const data = reactive({
      toRouter(path){
        proxy.$router.push({
          path
        })
      }
    })

    // 定义事件
    proxy.mittBus.on('toRouter',data.toRouter)
  },
  methods:{
    async getMusicList(){
      let data = await this.$api.getMusicList()
      this.musicList = data.data
    },
    getNavList(){
      const routers = this.$router.options.routes
      // 删除掉最后一个路由
      const nav = routers.pop()
      this.navList = routers.filter(e=>e.meta.nav)
    }
  },
  created() {
    this.getMusicList()
    this.getNavList()
  },
  components:{Personal_blog,Header,Footer,BackTop}
}
</script>

<style lang="less">
/* 引入全局cs文件 */
@import url('@/assets/css/index.css');
/* 响应式布局 */
@import url('@/assets/css/responsive.css');

/deep/ img{
  overflow: top;
}

.musciHint{
  position: absolute;
  top: 100px;
  left: 0;
  width: auto;
  padding: 10px;
  background: white;
  box-shadow: 0px 0px 6px #dfdfdf;
}
.noDataEmpty{
    padding-top: 80px;
    height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
