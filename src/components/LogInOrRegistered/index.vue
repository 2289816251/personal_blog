<template>
  <div class="LogInOrRegistered" v-show="Visible">
    <div class="bg" @click="hide" v-show="Visible">

    </div>
    <transition>
        <div class="content" :class="Visible ? 'scale-in-center' : 'scale-out-center'" v-show="Visible">
            <div class="top">
                <span :class="{active:isLoginOrRegistered}" @click="isLoginOrRegistered = true">登录</span>
                <span :class="{active:!isLoginOrRegistered}" @click="isLoginOrRegistered = false">注册</span>
            </div>
            <div class="center">
                <!-- 登录 -->
                <div class="login" v-show="isLoginOrRegistered">
                    <Login></Login>
                </div>
                <!-- 注册 -->
                <div class="register" v-show="!isLoginOrRegistered">
                    <Register></Register>
                </div>
            </div>
        </div>
    </transition>
  </div>
</template>
<script>
import {reactive, toRefs, getCurrentInstance} from 'vue'
import Login from './Login'
import Register from './Register'
export default({
    props:['Visible'],
    setup(props) {
        
        const {proxy} = getCurrentInstance()

        let data = reactive({
            isLoginOrRegistered:true, // 显示登录还是注册
            
            // 注册
            register:{
                username:'', // 用户名
                password:'', // 密码
            }
        })

        let methods = reactive({
            // 修改显示登录还是注册
            setIsShow(bol){
                data.isLoginOrRegistered = bol
            },
            // 点击遮罩层隐藏
            hide(){
                proxy.mittBus.emit('LogInOrRegistered',false)
            }
        })

        // 定义修改显示的时间
        proxy.mittBus.on('setIsShow',methods.setIsShow)

        return {
            ...toRefs(data),
            ...toRefs(methods)
        }
        
    },
    components:{ Login, Register }
});
</script>
<style lang="less" scoped>
@import url('@/assets/less/color.less');
.LogInOrRegistered{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .bg{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .content{
        position: absolute;
        background-color: @bg-color;
        border-radius: 8px;
        overflow: hidden;
        .top{
            display: flex;
            align-items: center;
            span{
                background-color: @bs-color;
                cursor: pointer;
                width: 50%;
                text-align: center;
                display: block;
                line-height: 50px;
                font-family: pfcg;
                font-size: 1.8rem;
                color: @f-color3;
            }
            .active{
                background-color: @bg-color;
                color: @f-color;
            }
        }
        .center{
            padding: 20px 30px;
            // 登录
            .login{
                div{
                    line-height: 70px;
                }
                .other{
                    line-height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
            // 注册
            .register{
                div{
                    line-height: 70px;
                }
                .other{
                    line-height: 30px;
                    text-align: center;
                }
            }
            &>div{
                width: 400px;
            }
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