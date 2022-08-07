import {useUserStore} from '@/store/userInfo'
import $api from '@/api/index'
export const useUuid = function(){
    const userStore = useUserStore()
    // const {uuid} = storeToRefs(userStore)
    // 其他信息
    const otherInfo = getHardwareInfo()
    // 添加用户id
    $api.addUuid(otherInfo).then(res=>{

        const {uuid,otherInfo} = res.data

        userStore.setData(uuid,otherInfo)
    })
}
// 获取用户硬件信息
function getHardwareInfo(){
    // 获取用户硬件信息
    const hardwareInfo = {
        // 系统
        system: navigator.platform,
        // 语言
        language: navigator.language
    }

    return hardwareInfo.system + '-' + hardwareInfo.language
}