import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("app", ["getMescrollByName"]),
  },
  // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onPageScroll(e) {
    this.getMescrollByName(this.$Route.name)?.onPageScroll(e);
  },
  // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onReachBottom() {
    this.getMescrollByName(this.$Route.name)?.onReachBottom();
  },
};
