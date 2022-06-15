<template>
  <u-cell-group class="switch-dark" :border="false">
    <u-cell title="深色模式">
      <u-switch slot="value" :value="darkMode" @change="setDarkMode" />
    </u-cell>
  </u-cell-group>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "SwitchDark",
  computed: {
    ...mapState("app", ["darkMode"]),
  },
  methods: {
    ...mapMutations("app", ["setDarkMode"]),
    // 监听深色模式改变
    onDarkChange(event) {
      console.log("darkmode change", new Date());
      const isDark = event.matches;
      this.setDarkMode(isDark);
      document.body.classList[isDark ? "add" : "remove"]("dark");
    },
    listenDarkChange() {
      window
        ?.matchMedia("(prefers-color-scheme: dark)")
        ?.addEventListener("change", this.onDarkChange, true);
    },
    // 模块热更新好像不会触发销毁事件?好像会出现多次
    destoryDarkChange() {
      window
        ?.matchMedia("(prefers-color-scheme: dark)")
        ?.removeEventListener("change", this.onDarkChange, true);
    },
  },
  mounted() {
    this.listenDarkChange();
  },
  beforeDestroy() {
    this.destoryDarkChange();
  },
};
</script>
<style lang="scss" scoped>
.switch-dark {
  background: $inverse;
}
</style>
