<template>
  <view class="sticky" :style="getStickyStyle">
    <slot />
  </view>
</template>
<script>
export default {
  name: "Sticky",
  props: { zIndex: { type: String | Number, default: 1 } },
  computed: {
    getStickyStyle() {
      return {
        zIndex: this.zIndex,
        position: "sticky",
        top: this.navbarHeight + "px",
        backgroundColor: "var(--inverse)",
      };
    },
  },
};
</script>
