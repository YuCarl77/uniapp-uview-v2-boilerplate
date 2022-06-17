import { mapGetters } from "vuex";
export default {
  methods: {
    // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
    onMescrollScroll(e) {
      this.getMescrollByName(this.$Route.name)?.forEach((v) =>
        v.onPageScroll(e)
      );
    },
    // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
    // 可根据标识符触发指定的触底事件
    onMescrollReachBottom(flag) {
      if (flag === undefined) {
        this.getMescrollByName(this.$Route.name)?.forEach((v) =>
          v.onReachBottom()
        );
        return;
      }
      this.getMescrollByName(this.$Route.name)
        ?.find((v) => v.name === flag)
        ?.onReachBottom();
    },
  },
  computed: {
    ...mapGetters("app", ["getMescrollByName"]),
  },
  // 定义成了函数,也可以由scroll-view事件触发
  onPageScroll(e) {
    this.onMescrollScroll(e);
  },
  onReachBottom() {
    this.onMescrollReachBottom();
  },
};
