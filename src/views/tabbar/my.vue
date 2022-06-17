<template>
  <view :class="['container', { dark: darkMode }]">
    <Navbar />
    <Sticky>
      <u-tabs
        :current="current"
        :list="tabList"
        :scrollable="false"
        @change="tabChange"
      />
    </Sticky>
    <swiper :current="current" @change="swiperChange">
      <swiper-item v-for="item in tabList" :key="item.id">
        <Page :name="item.id" @up="reachBottom" @down="pullRefresh">
          <text>{{ item.name }}</text>
          <Placeholder :count="40" />
        </Page>
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
    reachBottom(mescroll) {
      const { name } = mescroll;
      console.log("上拉加载mescroll会同时触发, 可通过标识区分" + name);
      mescroll.endSuccess();
      // 只判断当前激活项的tab下标是完全不够的
      // 还必须要加上mescroll的标识区分是哪一个触发的事件
      if (this.current === 0 && name === "tab-1") {
        console.log("当前第一项触底了");
      } else if (this.current === 1 && name === "tab-2") {
        console.log("当前第二项触底了");
      }
    },
  },
};
</script>
