<template>
  <view class="navbar">
    <u-navbar ref="navbar" placeholder safeAreaInsetTop>
      <view slot="left">
        <slot name="left" />
        <template v-if="showLeft">
          <view class="navbar__left">
            <view class="navbar__left--icon" @click="routerBack">
              <u-icon name="arrow-left" size="16" />
            </view>
            <u-line direction="column" length="12" />
            <view class="navbar__left--icon" @click="routerHome">
              <u-icon name="home" size="18" />
            </view>
          </view>
        </template>
      </view>
      <view slot="center">
        <slot name="center" />
        <template v-if="!$slots.center">
          <view class="navbar__center">
            {{ getTitle }}
          </view>
        </template>
      </view>
      <view slot="right" />
    </u-navbar>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",
  options: {
    styleIsolation: "shared",
    virtualHost: true,
  },
  computed: {
    ...mapState("app", ["tabList"]),
    getTitle() {
      return this.$Route?.meta.title || "";
    },
    // 是否展示左侧
    showLeft() {
      return (
        !this.tabList.some((v) => v.router === this.$Route.name) &&
        !this.$slots.left
      );
    },
  },
  methods: {
    // 返回上一级
    routerBack() {
      // 获取当前打开了多少页
      if (getCurrentPages().length > 1) this.$Router.back();
      else this.routerHome();
    },
    // 返回首页
    routerHome() {
      this.$Router.pushTab({ name: "index" });
    },
    // 获取navbar的高度,用于vuex存储方便sticky吸顶于其下
    initNavbarHeight() {
      const { navbarHeight } = this.$store.state.app;
      if (navbarHeight !== null) return;
      // 指向选择器到u-navbar组件内部的vue实例去,光在这this不行
      const query = uni.createSelectorQuery().in(this.$refs.navbar);
      const select = query.select(".u-navbar__content");
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
  },
  mounted() {
    this.initNavbarHeight();
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
