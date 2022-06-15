<template>
  <!-- 不知道为什么微信小程序很多改不了样式要套一层,哪怕给了样式隔离 -->
  <view class="switch-dark">
    <u-cell-group :border="false">
      <u-cell title="深色模式">
        <u-switch slot="value" :value="darkMode" @change="setDarkMode" />
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "SwitchDark",
  options: {
    styleIsolation: "shared",
    virtualHost: true,
  },
  data() {
    return {
      media: null,
    };
  },
  computed: {
    ...mapState("app", ["darkMode"]),
  },
  methods: {
    ...mapMutations("app", ["setDarkMode"]),
    // 深色模式改变事件
    onDarkChange(event) {
      console.log("darkmode change", new Date(), event);
      const isDark = event.matches;
      this.setDarkMode(isDark);
      document.body.classList[isDark ? "add" : "remove"]("dark");
      // 未测试, 尝试设置app的状态栏文字颜色
      // #ifdef APP-PLUS
      plus.navigator.setStatusBarStyle(isDark ? "dark" : "light");
      // #endif
    },
    // 监听深色模式改变
    listenDarkChange(init) {
      if (!window?.matchMedia) return;
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      if (init && this.darkMode === null) this.onDarkChange(media);
      media.addEventListener("change", this.onDarkChange, true);
      this.media = media;
    },
    // 销毁事件监听
    // 模块热更新好像不会触发销毁事件?好像会出现多次
    destoryDarkChange() {
      this.media.removeEventListener("change", this.onDarkChange, true);
    },
  },
  mounted() {
    //小程序没法监听深色变化
    this.listenDarkChange(true);
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
