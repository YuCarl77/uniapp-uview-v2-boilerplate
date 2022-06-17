<template>
  <view :style="[getStickyStyle]">
    <slot />
  </view>
</template>
<script>
export default {
  name: "Sticky",
  options: {
    // styleIsolation: "apply-shared",
    virtualHost: true,
  },
  props: {
    // 自定义层级
    zIndex: { type: String | Number, default: 1 },
    // 自定义吸顶距离
    offsetTop: { type: Number, default: -1 },
  },
  computed: {
    getStickyStyle() {
      return {
        zIndex: this.zIndex,
        position: "sticky",
        top: (this.offsetTop >= 0 ? this.offsetTop : this.navbarHeight) + "px",
        backgroundColor: "var(--inverse)",
      };
    },
  },
};
</script>
