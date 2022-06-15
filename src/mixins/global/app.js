import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("app", ["setDarkMode"]),
  },
  computed: {
    ...mapState("app", ["darkMode", "navbarHeight"]),
  },
  onLaunch() {
    // h5应当启动时就赋予body深色模式
    // 小程序端应每个页面都写一次container的dark类
    const browserMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    this.setDarkMode(this.darkMode === null ? browserMode : this.darkMode);
  },
};
