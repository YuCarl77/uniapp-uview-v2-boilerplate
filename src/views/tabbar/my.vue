<template>
  <view :class="['container', { dark: darkMode }]">
    <Navbar />
    <text>我的页</text>
    <Tabbar />
  </view>
</template>

<script>
import Navbar from "@/components/common/Navbar.vue";
import Tabbar from "@/components/common/Tabbar.vue";
export default {
  components: { Navbar, Tabbar },
};
</script>
