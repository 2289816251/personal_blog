import {defineStore} from 'pinia'

export const useUserStore = defineStore({
    id: 'userInfo', // id必填，且需要唯一
    state: () => {
        return {
            uuid: '', // 用户id
            otherInfo:'', //用户其他信息
            imgUrl:'', // 用户头像
            username: '' || localStorage.getItem('username'), // 用户名
            password: '' || localStorage.getItem('password'), // 密码
        }
    },
    actions:{
        setData(uuid,otherInfo){
            this.uuid = uuid
            this.otherInfo = otherInfo
        },
        // 注册 修改账号密码
        setRegister(username,password){
            this.username = username
            this.password = password
        },
        setLogin(obj){
            this.$state = {...obj}
        },
        // 清除数据
        deleteData(){
            this.$state = {
                uuid:'',
                otherInfo:'',
                imgUrl:'',
                username:'',
                password:''
            }
        }
    }
})