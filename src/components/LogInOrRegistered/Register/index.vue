<template>
  <a-form 
    ref="formRef"
    name="custom-validation"
    :model="register"
    :rules="rules"
    >
        <a-form-item has-feedback name="username">
            <a-input v-model:value="register.username" size="large" block placeholder="用户名只能包含数字和字母还有下划线" />
        </a-form-item>
        <a-form-item has-feedback name="password">
            <a-input-password v-model:value="register.password" size="large" block placeholder="密码长度为6-16位" />
        </a-form-item>
        <a-form-item>
            <span class="other">欢迎访问 Capricornus 的个人博客</span>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" size="large" block @click="registerCallback">注册</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
// import { Rule } from 'ant-design-vue/es/form';
import {message, Input, InputPassword, Checkbox, Button, Form, FormItem} from 'ant-design-vue'
import {reactive,toRefs,ref,getCurrentInstance} from 'vue'
import {useUserStore} from '@/store/userInfo'
import {storeToRefs} from 'pinia'
export default {
    setup(){

        const {proxy} = getCurrentInstance()

        let formRef = ref()

        const userStore = useUserStore()

        const {uuid}  = storeToRefs(userStore)

        // 数据
        const data = reactive({
            // 登录
            register:{
                username:'', // 用户名
                password:'' // 密码
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
            } else if( value.length < 6 || value.length > 16 ){
                return Promise.reject('密码长度为6-16位');
            } else {
                return Promise.resolve();
            }
        };

        // 验证规则
        const rules = {
        username: [{ validator:username, trigger: 'change' }],
        password: [{ validator:password, trigger: 'change' }]
        };

        // 注册
        let registerCallback = ()=>{
            // 验证表单
            formRef.value.validate().then(()=>{
                // 表单校验成功
                const {username,password} = data.register
                proxy.$api.register(uuid.value,username,password).then(res=>{
                    if(res.code === 200){
                        message.success(res.msg)
                        // // 保存用户信息到状态管理
                        userStore.setRegister(username,password)
                        // 切换登录页面
                        proxy.mittBus.emit('setIsShow',true)
                        // 修改数据
                        proxy.mittBus.emit('setLoginData',{loginUsername:username,loginPassword:password})
                        // 清空数据
                        formRef.value.resetFields();
                    }else{
                        message.error(res.msg)
                    }
                })
            }).catch(()=>{
                // 表单校验失败
                message.error('注册失败')
            })
        }

        return {
            ...toRefs(data),
            formRef,
            rules,
            registerCallback
        }
    },
    components:{ AInput:Input, AInputPassword:InputPassword, ACheckbox:Checkbox, AButton:Button, AForm:Form, AFormItem:FormItem, message }
}
</script>

<style lang="less" scoped>
    .other{
        display: flex;
        justify-content: center;
    }
</style>