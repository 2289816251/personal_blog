<template>
  <a-form 
    ref="formRef"
    name="custom-validation"
    :model="login"
    :rules="rules"
    >
        <a-form-item has-feedback name="loginUsername">
            <a-input v-model:value="login.loginUsername" size="large" block placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item has-feedback name="loginPassword">
            <a-input-password v-model:value="login.loginPassword" size="large" block placeholder="请输入密码" />
        </a-form-item>
        <a-form-item>
            <div class="other">
                <a-checkbox v-model:checked="login.rememberMe">记住我</a-checkbox>
                <a href="#" @click.prevent="forgotPassword">忘记密码?</a>
            </div>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" size="large" block @click="loginCallback">登录</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
// import { Rule } from 'ant-design-vue/es/form';
import {message, Input, InputPassword, Checkbox, Button, Form, FormItem} from 'ant-design-vue'
import {reactive,toRefs,ref,getCurrentInstance, onMounted} from 'vue'
export default {
    setup(){

        const {proxy} = getCurrentInstance()

        let formRef = ref()

        // 数据
        const data = reactive({
            // 登录
            login:{
                loginUsername:'', // 用户名
                loginPassword:'', // 密码
                rememberMe:false, // 记住我
            },
        })

        // 用户名验证规则
        let username = (Rule, value) => {
            if (value === '') {
                return Promise.reject('用户名不能为空');
            } else if (/\s/ig.test(value)){
                return Promise.reject('不能包含空格');
            } else if (value.length < 3 || value.length > 16){
                return Promise.reject('用户名长度为3-16位');
            } else if (/\W/ig.test(value)){
                return Promise.reject('用户名只能包含数字和字母还有下划线');
            } else {
                return Promise.resolve();
            }
        };

        // 密码验证规则
        let password = (Rule, value) => {
            if (value === '') {
                return Promise.reject('密码不能为空');
            } else if( value.length < 6 ){
                return Promise.reject('密码不能小于6位');
            } else {
                return Promise.resolve();
            }
        };

        // 验证规则
        const rules = {
            loginUsername: [{ validator:username, trigger: 'change' }],
            loginPassword: [{ validator:password, trigger: 'change' }]
        };

        // 登录
        let loginCallback = ()=>{
            // 验证表单
            formRef.value.validate().then(()=>{
                // 表单校验成功
                const {loginUsername,loginPassword,rememberMe} = data.login
                proxy.$api.login(loginUsername,loginPassword).then(res=>{
                    if(res.code === 200){
                        const token = res.token
                        // 保存token
                        localStorage.setItem('token',token)
                        // 判断是否选中记住我
                        if(data.login.rememberMe){
                            // 保存用户名和密码
                            localStorage.setItem('userInfo',JSON.stringify({
                                loginUsername,
                                loginPassword,
                                rememberMe
                            }))
                        }else{
                            // 清除用户名和密码
                            localStorage.removeItem('userInfo')
                        }
                        // 登录成功 隐藏遮罩
                        proxy.mittBus.emit('LogInOrRegistered',false)
                        // 获取用户信息
                        proxy.mittBus.emit('getUserInfo')
                        // 登录成功
                        message.success(res.msg)
                    }else{
                        // 登录失败
                        message.error(res.msg)
                    }
                })
            }).catch(()=>{
                // 表单校验失败
                message.error('登录失败')
            })
        }

        let methods = reactive({
            // 修改数据
            setData(obj){
                data.login = {...obj}
            },
            // 从本地读取用户信息
            getLocalStorageInfo(){
                // 获取本地存储的用户信息
                const userInfo = localStorage.getItem('userInfo')
                // 判断是否有用户信息
                if(userInfo){
                    // 有用户信息
                    const {loginUsername,loginPassword,rememberMe} = JSON.parse(userInfo)
                    // 设置数据
                    methods.setData({
                        loginUsername,
                        loginPassword,
                        rememberMe
                    })
                }
            },
            // 忘记密码
            forgotPassword(){
                message.warning('这都能忘记，你还记得你的名字吗？')
            }
        })

        onMounted(()=>{
            methods.getLocalStorageInfo()
        })

        // 定义修改登录账号密码的事件
        proxy.mittBus.on('setLoginData',methods.setData)

        return {
            ...toRefs(data),
            ...toRefs(methods),
            formRef,
            rules,
            loginCallback
        }
    },
    components:{ AInput:Input, AInputPassword:InputPassword, ACheckbox:Checkbox, AButton:Button, AForm:Form, AFormItem:FormItem, message }
}
</script>

<style lang="less" scoped>
    .other{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>