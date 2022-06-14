export default {
  computed: {
    getMescroll() {
      return this.$store.getters["app/getMescrollByName"](this.$Route.name);
    },
  },
  // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onPageScroll(e) {
    this.getMescroll && this.getMescroll.onPageScroll(e);
  },
  // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onReachBottom() {
    this.getMescroll && this.getMescroll.onReachBottom();
  },
};
