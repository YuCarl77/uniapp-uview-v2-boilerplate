<template>
  <u-navbar class="navbar" :title="getTitle" placeholder safeAreaInsetTop>
    <view class="navbar__left" slot="left">
      <u-icon class="navbar__left--icon" name="arrow-left" size="16" />
      <u-line direction="column" length="12" />
      <u-icon class="navbar__left--icon" name="home" size="18" />
    </view>
  </u-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    getTitle() {
      return this.$Route?.meta.title || "";
    },
  },
  mounted() {
    const { navbarHeight } = this.$store.state.app;
    if (navbarHeight !== null) return;
    // 获取navbar的高度,用于vuex存储方便sticky吸顶于其下
    const selector = uni
      .createSelectorQuery()
      .in(this)
      .select(".u-navbar__content");
    selector
      .boundingClientRect(({ height }) =>
        this.$store.commit("app/setNavbarHeight", height)
      )
      .exec();
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  ::v-deep .u-navbar--fixed {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      transform: scaleY(0.5);
      background-color: #e7e7e7;
    }
  }

  ::v-deep .u-navbar__content {
    min-width: 320px;
  }
  .navbar__left {
    @include flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 40px;
    .navbar__left--icon {
      padding: 4px 10px;
    }
  }
}
</style>
