<template>
  <div class="frostedGlassCard">

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
// 毛玻璃卡片
.frostedGlassCard{
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
</style>