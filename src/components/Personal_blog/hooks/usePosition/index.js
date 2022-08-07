// 计算出位置
import {reactive} from 'vue'

export default function(props){

    // console.log(props)

    let data = reactive({
        posi:'', // 位置
        loca:'', // 偏移量
        classNameName:'', // 类名
        switchAngle:0, // 切换按钮角度
        direction:''
    })
    switch(props.position){
        case 'left':
            if(props.location >= 0){
                data.posi = 'top',
                data.loca = props.location
            }else{
                data.posi = 'bottom',
                data.loca = Math.abs(props.location)
            }
            data.className = 'SideLeft'
            data.switchAngle = 0
            data.direction = 'X'
            break
        case 'top':
            if(props.location >= 0){
                data.posi = 'left',
                data.loca = props.location
            }else{
                data.posi = 'right',
                data.loca = Math.abs(props.location)
            }
            data.className = 'SideTop'
            data.switchAngle = 90
            data.direction = 'Y'
            break
        case 'right':
            if(props.location >= 0){
                data.posi = 'top',
                data.loca = props.location
            }else{
                data.posi = 'bottom',
                data.loca = Math.abs(props.location)
            }
            data.className = 'SideRight'
            data.switchAngle = 180
            data.direction = 'X'
            break
        case 'bottom':
            if(props.location >= 0){
                data.posi = 'left',
                data.loca = props.location
            }else{
                data.posi = 'right',
                data.loca = Math.abs(props.location)
            }
            data.className = 'SideBottom'
            data.switchAngle = -90
            data.direction = 'Y'
            break
    }
    return data
}