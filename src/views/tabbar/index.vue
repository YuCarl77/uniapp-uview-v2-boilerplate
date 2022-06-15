<template>
  <view :class="['container', { dark: darkMode }]">
    <Navbar />
    <Page
      class="container"
      :pageSize="pageSize"
      @up="reachBottom"
      @down="pullRefresh"
    >
      <TokenBtns />
      <u-button
        type="warning"
        text="发送请求带toast"
        @click="testRequest(true)"
      />
      <u-button text="发送请求不带toast" @click="testRequest" />
      <Sticky>
        <SwitchDark />
      </Sticky>
      <view v-for="idx in 40" :key="idx">
        {{ idx }}
      </view>
    </Page>
  </view>
</template>

<script>
import SwitchDark from "@/components/common/SwitchDark.vue";
import TokenBtns from "@/components/common/TokenBtns.vue";
import Navbar from "@/components/common/Navbar.vue";
import Sticky from "@/components/common/Sticky.vue";
import Page from "@/components/common/Page.vue";
export default {
  components: { Page, Navbar, Sticky, TokenBtns, SwitchDark },
  data() {
    return { pageSize: 10 };
  },
  methods: {
    // 上拉加载
    reachBottom(ev) {
      const { num, size } = ev;
      console.log(`分页页数:${num} 分页条数:${size}`);
      ev.endBySize(6, 10);
    },
    // 下拉刷新
    pullRefresh(ev) {
      ev.resetUpScroll(); // 重置数据为第一页
      ev.endSuccess();
    },
    // 测试调用接口
    async testRequest(toast = false) {
      try {
        // 发送请求, 第三个参数用于传递自定义参数, 默认异常都会弹出toast, 除非指定false
        const res = await this.$http.getUserInfo({}, { toast });
        console.log("获取到了数据", res);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
