<template>
  <view :class="['uni-wrapper', { dark: darkMode }]">
    <router-view />
  </view>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "main",
  computed: {
    ...mapState("app", ["darkMode"]),
  },
};
</script>

<style lang="scss">
// 1. scss认识后缀,不需要写全
// 2. 不需要生成为css文件的scss，应当以_开头命名
@import "@/assets/styles/common";
</style>
