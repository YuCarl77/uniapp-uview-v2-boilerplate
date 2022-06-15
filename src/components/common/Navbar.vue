<template>
  <u-navbar ref="navbar" class="navbar" placeholder safeAreaInsetTop>
    <view class="navbar__left" slot="left">
      <u-icon class="navbar__left--icon" name="arrow-left" size="16" />
      <u-line direction="column" length="12" />
      <u-icon class="navbar__left--icon" name="home" size="18" />
    </view>
    <view class="navbar__center" slot="center">
      {{ getTitle }}
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
    this.$store.commit(
      "app/setNavbarHeight",
      Number(this.$refs.navbar.height.replace("px", ""))
    );
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  color: $main;
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
