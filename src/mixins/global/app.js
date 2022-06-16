import { mapState } from "vuex";
export default {
  methods: {
    // 根据路由名获取路径
    getRoutePathByName(name) {
      return this.$Router.options.routes.find((v) => v.name === name)?.path;
    },
  },
  computed: {
    ...mapState("app", ["darkMode", "navbarHeight"]),
  },
};
