<template>
  <div id="components-back-top-demo-custom">
    <a-back-top>
      <div class="ant-back-top-inner">
        <caret-up-outlined :style="{fontSize:18 + 'px'}"/>
      </div>
    </a-back-top>
  </div>
</template>

<script>
import {BackTop} from 'ant-design-vue'
import {CaretUpOutlined} from '@ant-design/icons-vue'
export default {
    components:{
        ABackTop:BackTop,
        CaretUpOutlined
    }
}
</script>

<style lang="less" scoped>
@import url('@/assets/less/color.less');
#components-back-top-demo-custom .ant-back-top {
  bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 50%;
  background-color: @f-active;
  color: #fff;
  text-align: center;
}
</style>