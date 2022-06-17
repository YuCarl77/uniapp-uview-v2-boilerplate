<template>
  <view :class="['container', { dark: darkMode }]">
    <Navbar />
    <u-tabs
      :current="current"
      :list="tabList"
      :scrollable="false"
      @change="tabChange"
    />
    <swiper :current="current" @change="swiperChange">
      <swiper-item v-for="item in tabList" :key="item.id">
        <scroll-view
          class="scroll-view"
          scroll-y
          @scroll="onMescrollScroll"
          @scrolltolower="onCustomReachBottom"
        >
          <Page :name="item.id" @up="reachBottom" @down="pullRefresh">
            <text>{{ item.name }}</text>
            <Placeholder :count="40" />
          </Page>
        </scroll-view>
      </swiper-item>
    </swiper>
    <Tabbar />
  </view>
</template>

<script>
import Page from "@/components/common/Page.vue";
import Navbar from "@/components/common/Navbar.vue";
import Tabbar from "@/components/common/Tabbar.vue";
import Placeholder from "@/components/common/Placeholder.vue";
import Sticky from "@/components/common/Sticky.vue";
export default {
  name: "My",
  components: { Navbar, Tabbar, Page, Placeholder, Sticky },
  data() {
    return {
      current: 0, // 当前是第几个选项卡
      tabList: [
        { id: "tab-1", name: "选项卡1" },
        { id: "tab-2", name: "选项卡2" },
      ],
    };
  },
  methods: {
    tabChange({ index }) {
      this.current = index;
    },
    swiperChange(ev) {
      this.current = ev.detail.current;
    },
    pullRefresh(mescroll) {
      const { name } = mescroll;
      console.log("当前触发下拉刷新的mescroll是标识为" + name);
      let delay;
      if (name === "tab-1") {
        console.log("第1个下拉了,对其进行了一些操作,较快的返回结果");
        delay = 5000;
      } else {
        console.log("第2个下拉了,对其进行了一些操作,较慢的返回结果,互不影响");
        delay = 10000;
      }
      setTimeout(() => mescroll.endSuccess(), delay);
    },
    // 指定触底加载的是哪个mescroll标识
    onCustomReachBottom() {
      this.onMescrollReachBottom(this.tabList[this.current].id);
    },
    // 这个才是真正mescroll触底回来的
    reachBottom(mescroll) {
      const { name } = mescroll;
      console.log(
        `上拉mescroll触发同一个回调,可通过标识${name}或上一个函数的关键信息如current区分`
      );
      if (this.current === 0) {
        console.log("当前第一项触底了");
        // 参考mescroll结束方法告诉mescroll总共多少数量和当前每页多少数量
        mescroll.endBySize(mescroll.size, 20);
        return;
      }
      console.log("当前第二项触底了");
      mescroll.endBySize(mescroll.size, 30);
    },
  },
};
</script>
