import { createApp } from 'vue'
import App from './App.vue'

// 引入全局组件
// import Personal_blog from '@/components/Personal_blog'

// 引入ant-Design-Vue
import {Row,Col,Empty} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 引入api
import api from '@/api/index'

// 引入pinia - 状态管理
import {createPinia} from 'pinia'

// 引入mitt - 事件总线
import mitt from 'mitt'

// 引入路由
import router from '@/router/index'

const app = createApp(App)

const pinia = createPinia()

// 注册全局组件
app.component('a-row',Row)
app.component('a-col',Col)
app.component('a-empty',Empty)

// 原型添加全局api
app.config.globalProperties.$api = api
// 原型添加全局mitt
app.config.globalProperties.mittBus = new mitt()

app.use(pinia).use(router).mount('#app')
