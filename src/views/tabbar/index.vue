<template>
  <view class="container">
    <HelloWorld />
  </view>
</template>

<script>
import HelloWorld from "@/components/common/HelloWorld.vue";

export default {
  components: { HelloWorld },
  mounted() {
    // 测试存储vuex的数据
    this.$store.commit("user/setToken", "a54d86e5-21c9-43f4-a45d-327ffe413dd9");
  },
};
</script>
