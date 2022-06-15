<template>
  <view id="navbar" class="navbar">
    <u-navbar ref="navbar" placeholder safeAreaInsetTop>
      <view class="navbar__left" slot="left">
        <view class="navbar__left--icon">
          <u-icon name="arrow-left" size="16" />
        </view>
        <u-line direction="column" length="12" />
        <view class="navbar__left--icon">
          <u-icon name="home" size="18" />
        </view>
      </view>
      <view class="navbar__center" slot="center">
        {{ getTitle }}
      </view>
    </u-navbar>
  </view>
</template>

<script>
export default {
  name: "Navbar",
  options: {
    styleIsolation: "shared",
    virtualHost: true,
  },
  computed: {
    getTitle() {
      return this.$Route?.meta.title || "";
    },
  },
  mounted() {
    const { navbarHeight } = this.$store.state.app;
    if (navbarHeight !== null) return;
    // 指向选择器到u-navbar组件内部的vue实例去,光在这this不行
    const query = uni.createSelectorQuery().in(this.$refs.navbar);
    const select = query.select(".u-navbar__content");
    // 获取navbar的高度,用于vuex存储方便sticky吸顶于其下
    select
      .boundingClientRect((rect) => {
        const { statusBarHeight } = uni.getSystemInfoSync();
        this.$store.commit(
          "app/setNavbarHeight",
          rect.height + statusBarHeight
        );
      })
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
    transition: all 0.3s ease;
  }

  .navbar__left {
    @include flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 40px;
    .navbar__left--icon {
      padding: 4px 10px;
      ::v-deep .u-icon__icon {
        color: $main !important;
        transition: color 0.3s ease;
      }
    }
  }
}
</style>
