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
        <Page :name="item.id" @down="pullRefresh">
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
export default {
  name: "My",
  components: { Navbar, Tabbar, Page, Placeholder },
  data() {
    return {
      current: 0, // 当前是第几个选项卡
      tabList: [
        { id: "tab-1", name: "某个标签" },
        { id: "tab-2", name: "某个标签2" },
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
      // 只判断当前激活项的tab下标是完全不够的
      // 最好加上mescroll的标识区分是哪一个触发的事件
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
  },
};
</script>
