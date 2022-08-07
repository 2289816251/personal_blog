<template>
  <a-radio-group v-model:value="value" v-if="dataList.length > 1">
    <a-radio-button :value="item" v-for="(item,index) in dataList" :key="index">{{item}}</a-radio-button>
  </a-radio-group>
</template>

<script>
import { RadioGroup , RadioButton } from "ant-design-vue";
import {reactive, toRefs} from 'vue'
export default {
    props:{
        dataList:{
            type:Array,
            default:[]
        },
        default:{
            type:String,
        }
    },
    setup(props){
        let data = reactive({
            value:props.default ? props.default : ''
        })

        return {
            ...toRefs(data)
        }
    },
    components:{ ARadioGroup:RadioGroup, ARadioButton:RadioButton }
};
</script>

<style></style>
