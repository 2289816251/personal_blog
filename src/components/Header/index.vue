<template>
  <div id="headerBg">
    <div class="header">
        <a-row justify="center" align="middle" :gutter="{ xs: 8, sm: 16, md: 0, lg: 0 }">
        <!-- logo -->
            <a-col :xs="8" :sm="8" :md="4" :xl="4" flex>
                <div class="logo">
                    <img src="../../assets/logo.png" alt="加载失败！">
                </div>
            </a-col>
            <!-- 导航 -->
            <a-col :xs="8" :sm="8" :md="16" :xl="16" flex>
                <div class="nav">
                    <a-row justify="center" align="middle" :gutter="{ xs: 8, sm: 0, md: 0, lg: 0 }">
                        <a-col align="center" v-for="(item,index) in navData" :key="index" :xs="item.path.search(active.split('/')[1]) >= 1 ? 24 : 0" :sm="item.path.search(active.split('/')[1]) >= 1 ? 24 : 0" :md="24 / navData.length" :xl="24 / navData.length" flex>
                            <template v-if="!item.children">
                                <a href="#" id="a" :class="item.path == active ? 'active' : ''" @click.prevent="changeNav(item.path)">{{item.meta.title}}</a>
                            </template>
                            <!-- 下拉列表 -->
                            <a-dropdown placement="bottom" overlayClassName=".he" :overlayStyle="{'padding-top':'20px','width':'auto'}" v-else>
                                <a href="#" id="a" class="ant-dropdown-link" :class="item.path.search(active.split('/')[1]) >= 1 ? 'active' : ''" @click.prevent="11">
                                    {{item.meta.title}}
                                    <down-outlined />
                                </a>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item v-for="(it,i) in item.children" :key="i">
                                            <a href="javascript:;" @click.prevent="changeNav(item.path+'/'+it.path)">{{it.meta.title}}</a>
                                        </a-menu-item>
                                    </a-menu>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                </template>
                            </a-dropdown>
                            <p class="he"></p>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
            <!-- 右边 -->
            <a-col :xs="8" :sm="8" :md="4" :xl="4" flex>
                <div class="other">
                    <a-row justify="center" align="middle" :gutter="{ xs: 8, sm: 10, md: 10, lg: 10 }">
                        <!-- 搜索 -->
                        <a-col :xs="8" :sm="8" :md="12" :xl="12" title="搜索">
                            <a href="#" @click.prevent="search">
                                <svg id="headerIcon" t="1658304083503" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18702" :width="iconSize" :height="iconSize"><path d="M862.609 816.955L726.44 680.785l-0.059-0.056a358.907 358.907 0 0 0 56.43-91.927c18.824-44.507 28.369-91.767 28.369-140.467 0-48.701-9.545-95.96-28.369-140.467-18.176-42.973-44.19-81.56-77.319-114.689-33.13-33.129-71.717-59.144-114.69-77.32-44.507-18.825-91.767-28.37-140.467-28.37-48.701 0-95.96 9.545-140.467 28.37-42.973 18.176-81.56 44.19-114.689 77.32-33.13 33.129-59.144 71.717-77.32 114.689-18.825 44.507-28.37 91.767-28.37 140.467 0 48.7 9.545 95.96 28.37 140.467 18.176 42.974 44.19 81.561 77.32 114.69 33.129 33.129 71.717 59.144 114.689 77.319 44.507 18.824 91.767 28.369 140.467 28.369 48.7 0 95.96-9.545 140.467-28.369 32.78-13.864 62.997-32.303 90.197-54.968 0.063 0.064 0.122 0.132 0.186 0.195l136.169 136.17c6.25 6.25 14.438 9.373 22.628 9.373 8.188 0 16.38-3.125 22.627-9.372 12.496-12.496 12.496-32.758 0-45.254z m-412.274-69.466c-79.907 0-155.031-31.118-211.534-87.62-56.503-56.503-87.62-131.627-87.62-211.534s31.117-155.031 87.62-211.534c56.502-56.503 131.626-87.62 211.534-87.62s155.031 31.117 211.534 87.62c56.502 56.502 87.62 131.626 87.62 211.534s-31.118 155.031-87.62 211.534c-56.503 56.502-131.627 87.62-211.534 87.62z" p-id="18703"></path></svg>
                            </a>
                        </a-col>
                        <!-- 我的 -->
                        <a-col :xs="8" :sm="8" :md="12" :xl="12" title="我的">
                            <!-- 未登录 -->
                            <a href="#" @click.prevent="LogInOrRegistered" v-if="!imgUrl">
                                <svg id="headerIcon" t="1658303087163" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16368" :width="iconSize" :height="iconSize"><path d="M885.333333 96c23.786667 0 39.253333 25.034667 28.618667 46.314667a7024.8 7024.8 0 0 0-56.917333 116.234666A424.853333 424.853333 0 0 1 938.666667 509.589333c0 235.637333-191.029333 426.666667-426.666667 426.666667s-426.666667-191.029333-426.666667-426.666667c0-235.648 191.029333-426.666667 426.666667-426.666666a424.938667 424.938667 0 0 1 196.544 47.872C762.453333 107.573333 821.482667 96 885.333333 96z m-164.234666 99.381333a32 32 0 0 1-29.696-1.066666A360.821333 360.821333 0 0 0 512 146.933333c-200.298667 0-362.666667 162.368-362.666667 362.666667 0 200.288 162.368 362.666667 362.666667 362.666667s362.666667-162.378667 362.666667-362.666667a360.96 360.96 0 0 0-79.850667-227.061333 32 32 0 0 1-4-33.706667 5870.922667 5870.922667 0 0 1 41.322667-85.589333c-39.786667 4.970667-76.768 15.701333-111.04 32.149333zM330.666667 362.666667a42.666667 42.666667 0 0 1 42.666666 42.666666v64a42.666667 42.666667 0 1 1-85.333333 0v-64a42.666667 42.666667 0 0 1 42.666667-42.666666z m170.666666 0a42.666667 42.666667 0 0 1 42.666667 42.666666v64a42.666667 42.666667 0 1 1-85.333333 0v-64a42.666667 42.666667 0 0 1 42.666666-42.666666z" p-id="16369"></path></svg>
                            </a>
                            <!-- 登录 -->
                            <a-dropdown v-else>
                                <a class="ant-dropdown-link" @click.prevent>
                                    <div class="img" v-if="imgUrl">
                                        <img :src="imgUrl" alt="user">
                                    </div>
                                    <div class="icon" v-else>
                                        <svg t="1659514114853" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3038"><path d="M582.352706 568.885667c-3.173009-1.033003-23.208068-10.067029-10.688031-48.126141l-0.173001 0c32.628096-33.602098 57.568169-87.703257 57.568169-140.945413 0-81.88124-54.45416-124.788366-117.727345-124.788366-63.311185 0-117.455344 42.908126-117.455344 124.788366 0 53.458157 24.803073 107.775316 57.627169 141.295414 12.792037 33.563098-10.08603 46.021135-14.873044 47.77614-66.271194 23.96307-144.009422 67.648198-144.009422 110.771325l0 16.157047c0 58.755172 113.910334 72.111211 219.332643 72.111211 105.578309 0 218.047639-13.356039 218.047639-72.111211l0-16.157047C730.001139 635.229861 651.87491 591.897734 582.352706 568.885667L582.352706 568.885667zM582.352706 568.885667" p-id="3039"></path><path d="M511.308498 958.895809c-246.714723 0-447.417311-200.702588-447.417311-447.423311 0-246.714723 200.702588-447.417311 447.417311-447.417311 246.721723 0 447.423311 200.702588 447.423311 447.417311C958.731809 758.194221 758.029221 958.895809 511.308498 958.895809L511.308498 958.895809zM511.308498 128.259376c-211.307619 0-383.213123 171.905504-383.213123 383.213123 0 211.279619 171.905504 383.219123 383.213123 383.219123 211.279619 0 383.219123-171.939504 383.219123-383.219123C894.527621 300.165879 722.588117 128.259376 511.308498 128.259376L511.308498 128.259376zM511.308498 128.259376" p-id="3040"></path></svg>
                                    </div>
                                </a>
                                <template #overlay>
                                <a-menu>
                                    <a-menu-item key="0">
                                        <span>欢迎您 - {{username}}</span>
                                    </a-menu-item>
                                    <a-menu-item key="1">
                                        <a href="#" @click.prevent="signOut">退出登录</a>
                                    </a-menu-item>
                                </a-menu>
                                </template>
                            </a-dropdown>
                        </a-col>
                        <!-- 更多 -->
                        <a-col :xs="8" :sm="8" :md="0" :xl="0" @click="isShowVisible" title="导航">
                            <a href="#" @click.prevent="0">
                                <svg id="headerIcon" t="1658302944884" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16076" :width="iconSize" :height="iconSize"><path d="M832 229.333333a37.333333 37.333333 0 0 1 3.072 74.538667L832 304H192a37.333333 37.333333 0 0 1-3.072-74.538667L192 229.333333h640zM832 485.333333a37.333333 37.333333 0 0 1 3.072 74.538667L832 560H533.333333a37.333333 37.333333 0 0 1-3.072-74.538667L533.333333 485.333333h298.666667zM832 741.333333a37.333333 37.333333 0 0 1 3.072 74.538667L832 816H341.333333a37.333333 37.333333 0 0 1-3.072-74.538667L341.333333 741.333333h490.666667z" p-id="16077"></path></svg>
                            </a>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-row>
        <!-- 抽屉 -->
        <a-drawer
            v-model:visible="visible"
            class="custom-class"
            title="欢迎访问 Capricornus 的个人博客"
            placement="right"
            @after-visible-change="afterVisibleChange"
        >
            <a-menu
                v-model:selectedKeys="selectedKeys"
                class="menu"
                mode="inline"
                @select="selectChange"
                >
                <div v-for="(item,index) in navData" :key="index">
                    <a-menu-item :title="item.title" v-if="!item.children" :key="index" @click.prevent="changeNav(item.path)">{{item.meta.title}}</a-menu-item>
                    <a-sub-menu :key="item.meta.title" v-else>
                        <template #title>{{item.meta.title}}</template>
                        <a-menu-item :key="it.meta.title" v-for="(it,i) in item.children" @click.prevent="changeNav(item.path+'/'+it.path)">{{it.meta.title}}</a-menu-item>
                    </a-sub-menu>
                </div>
            </a-menu>
        </a-drawer>
        <!-- 搜索弹出框 -->
        <div class="search" v-show="modal2Visible">
            <!-- 背景遮罩 -->
            <div class="bg" @click="hiddSearch">

            </div>
            <!-- 内容 -->
            <div class="content">
                <div :class="modal2Visible ? 'scale-in-center' : 'scale-out-center'">
                    <input @change="searchCallback" v-model="searchValue" ref="refInput" type="text" placeholder="搜索">
                    <svg @click="searchCallback" id="headerIcon" t="1658304083503" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18702" :width="iconSize" :height="iconSize"><path d="M862.609 816.955L726.44 680.785l-0.059-0.056a358.907 358.907 0 0 0 56.43-91.927c18.824-44.507 28.369-91.767 28.369-140.467 0-48.701-9.545-95.96-28.369-140.467-18.176-42.973-44.19-81.56-77.319-114.689-33.13-33.129-71.717-59.144-114.69-77.32-44.507-18.825-91.767-28.37-140.467-28.37-48.701 0-95.96 9.545-140.467 28.37-42.973 18.176-81.56 44.19-114.689 77.32-33.13 33.129-59.144 71.717-77.32 114.689-18.825 44.507-28.37 91.767-28.37 140.467 0 48.7 9.545 95.96 28.37 140.467 18.176 42.974 44.19 81.561 77.32 114.69 33.129 33.129 71.717 59.144 114.689 77.319 44.507 18.824 91.767 28.369 140.467 28.369 48.7 0 95.96-9.545 140.467-28.369 32.78-13.864 62.997-32.303 90.197-54.968 0.063 0.064 0.122 0.132 0.186 0.195l136.169 136.17c6.25 6.25 14.438 9.373 22.628 9.373 8.188 0 16.38-3.125 22.627-9.372 12.496-12.496 12.496-32.758 0-45.254z m-412.274-69.466c-79.907 0-155.031-31.118-211.534-87.62-56.503-56.503-87.62-131.627-87.62-211.534s31.117-155.031 87.62-211.534c56.502-56.503 131.626-87.62 211.534-87.62s155.031 31.117 211.534 87.62c56.502 56.502 87.62 131.626 87.62 211.534s-31.118 155.031-87.62 211.534c-56.503 56.502-131.627 87.62-211.534 87.62z" p-id="18703"></path></svg>
                </div>
            </div>
        </div>
        <!-- 登录或注册对话框 -->
        <LogInOrRegistered :Visible="Visible"/>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs, ref, nextTick} from 'vue'
import {Drawer,Menu,SubMenu,MenuItem,Dropdown,message} from 'ant-design-vue'
import {MailOutlined,DownOutlined,SearchOutlined,UserOutlined} from '@ant-design/icons-vue'
import {posiHeightTrue,posiHeightFalse} from '@/hooks/useHeader'
import LogInOrRegistered from '../LogInOrRegistered'
import {useUserStore} from '@/store/userInfo'
import {storeToRefs} from 'pinia'
import {useUuid} from '@/hooks/useUuid'
export default {
name:'Header',
props:{
    navData:{
        type:Array,
        default:[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    }
},
setup(props) {

    // 拿到用户状态
    const userStore = useUserStore()
    // 解构出属性
    const {uuid,username,imgUrl} = storeToRefs(userStore)

    const {proxy} = getCurrentInstance()

    // 定义ref                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    const refInput = ref()

    const data = reactive({
        iconSize:24, // 图标大小
        visible:false, // 是否显示抽屉
        active:proxy.$router.options.history.location ? proxy.$router.options.history.location : '/home', // 当前激活的菜单
        selectedKeys:[], // 当前选中的菜单
        modal2Visible:false, // 是否显示搜索
        searchValue:'', // 搜索内容
        Visible:false, // 是否显示登录或注册对话框
        imgUrl:imgUrl.value, // 头像地址
        username:username.value, // 用户名
        uuid:uuid.value, // 用户id
        isShowVisible(){ // 点击显示抽屉
            data.visible = true
        },
        afterVisibleChange(bol){ // 抽屉动画结束后的回调
            
        },
        selectChange(value){ // 菜单选中回调
            // data.selectedKeys = value.key
        },
        changeNav(path){
            data.active = path
            proxy.mittBus.emit('toRouter',path)
        },
        search(){ // 搜索图标回调
            data.modal2Visible = true
            posiHeightTrue()
            // 等待真实DOM刷新 在执行获取焦点
            nextTick(()=>{
                refInput.value.focus()
            })
        },
        hiddSearch(){ // 遮罩层回调
             data.modal2Visible = false
             posiHeightFalse()
        },
        searchCallback(){ // 搜索回调
            if(data.searchValue == ''){
                message.warning('请输入搜索内容')
                return
            }
            // 隐藏遮罩层
            data.modal2Visible = false
            
            // 跳转到搜索页面
            proxy.$router.replace({path:`/search/${data.searchValue}`})
                
            // 清除搜索关键词
            data.searchValue = ''
            posiHeightFalse()
        },
        // 显示登录还是注册
        LogInOrRegistered(bol=true){
            if(bol){
                posiHeightTrue()
            }else{
                posiHeightFalse()
            }
            data.Visible = bol
        },
        // 获取用户信息
        getUserInfo(){
            proxy.$api.getUserInfo().then(res=>{
                if(res.code == 200){
                    const {uuid,imgUrl,username} = res.data
                    userStore.setLogin(res.data)
                    data.imgUrl = imgUrl
                    data.username = username
                    data.uuid = uuid
                }else{
                    useUuid()
                }
            }).catch(err=>{
                console.log('err'+err)
            })
        },
        // 登出
        signOut(){
            proxy.$api.logout(uuid).then(res=>{
                if(res.code == 200){

                    // 清除本地token
                    localStorage.removeItem('token')

                    // 清除pinia中的用户信息
                    userStore.deleteData()

                    // 清除本地数据
                    data.imgUrl = ''
                    data.username = ''
                    data.uuid = ''
                    
                    // 提示信息 
                    message.success(res.msg)
                }
            })
        }
    })

    proxy.mittBus.on('changNva',(path)=>{
        data.active = path  // 将地址赋予
    })

    proxy.mittBus.on('LogInOrRegistered',data.LogInOrRegistered)
    proxy.mittBus.on('getUserInfo',data.getUserInfo)

    data.getUserInfo()

    return {
        ...toRefs(data),
        refInput
    }
},
components:{ADrawer:Drawer,AMenu:Menu,ASubMenu:SubMenu,AMenuItem:MenuItem,ADropdown:Dropdown,MailOutlined,DownOutlined,SearchOutlined,LogInOrRegistered,UserOutlined}

}
</script>

<style lang="less" scoped>
@import url('@/assets/less/color.less');

@iconSize:24px;

#headerBg{
    transition: all 0.5s;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    height:@navHeight;
    .header{
        height: @navHeight;
        .logo{
            width: 40px;
            height: 40px;
            img{
                cursor:pointer;
                width: 100%;
                height: 100%;
            }
        }
        .nav{
            .ant-row{
                .ant-col{
                    position: relative;
                    a{
                        display: block;
                        font-size: 1.8rem;
                        font-weight: 600;
                        color: @bg-color;
                        // text-shadow: 0px 0px 6px #999;
                    }
                    p{
                        transition: all 0.5s;
                        width: 0px;
                        height: 4px;
                        position: absolute;
                        left: 0;
                        bottom: -26px;
                        margin: 0;
                        background: @f-active;
                    }
                    .active{
                        color: @f-active !important;
                        text-shadow: none;
                    }
                }
                .ant-col:hover{
                    p{
                        width: 100%;
                    }
                }
            }
        }
        .other{
            height: @navHeight !important;
            display: flex;
            justify-content: right;
            align-items: center;
            a{
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                svg{
                    transition: all 0.5s;
                    cursor:pointer;
                    fill: @bg-color;
                }
                &:hover{
                    svg{
                        fill: @f-active !important;
                    }
                }
            }
            .ant-dropdown-link{
                div{
                    width: @iconSize;
                    height: @iconSize;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    svg{
                        width: @iconSize;
                        height: @iconSize;
                    }
                }
            }
        }
        // 抽屉
        .custom-class{
            z-index: 99999999;
            .menu{
                width: 100%;
                border: none;
            }
        }
    }
}
.height{
    background-color: @bg-color;
    box-shadow: 0px 3px 10px @bs-color;
    a{
        color: @f-color !important;
    }
    svg{
        fill: @f-color !important;
    }
}
.search{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .bg{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.9);
    }
    .content{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-bottom: 2px solid @f-active;
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        input{
            width: 90%;
            outline: none;
            border: none;
            font-size: 3.8rem;
            background-color: transparent;
            color: @f-color2;
        }
        svg{
            width: 10%;
            cursor: pointer;
            fill: @f-active !important;
            width: 38px;
            height: 38px;
        }
    }
}

// 显示动画
.scale-in-center{-webkit-animation:scale-in-center .5s cubic-bezier(.25,.46,.45,.94) both;animation:scale-in-center .5s cubic-bezier(.25,.46,.45,.94) both}
@-webkit-keyframes scale-in-center{0%{-webkit-transform:scale(0);transform:scale(0);opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes scale-in-center{0%{-webkit-transform:scale(0);transform:scale(0);opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}
// 隐藏动画
.scale-out-center{-webkit-animation:scale-out-center .5s cubic-bezier(.55,.085,.68,.53) both;animation:scale-out-center .5s cubic-bezier(.55,.085,.68,.53) both}
@-webkit-keyframes scale-out-center{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(0);transform:scale(0);opacity:1}}@keyframes scale-out-center{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(0);transform:scale(0);opacity:1}}
</style>