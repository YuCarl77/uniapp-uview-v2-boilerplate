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
