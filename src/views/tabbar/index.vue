<template>
  <view class="container">
    <Page @up="reachBottom" @down="pullDownRefresh">
      <u-button type="primary" text="存储token" @click="testCommit" />
      <u-button
        type="warning"
        text="发送请求带toast"
        @click="testRequest(true)"
      />
      <u-button text="发送请求不带toast" @click="testRequest" />
      <HelloWorld />
      <text>token: {{ token || "null" }}</text>
      <view v-for="idx in goodsList" :key="idx">{{ idx }}</view>
    </Page>
  </view>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("user");
import HelloWorld from "@/components/common/HelloWorld.vue";
import Page from "@/components/common/Page.vue";
export default {
  components: { HelloWorld, Page },
  computed: {
    ...mapState(["token"]),
  },
  data() {
    return {
      goodsList: [],
    };
  },
  methods: {
    // 上拉加载
    reachBottom(page) {
      console.log(page);
    },
    // 下拉刷新
    pullDownRefresh(e) {
      console.log(e);
      // this.goodsList = [...this.goodsList, Math.random()];
      setTimeout(() => e.endSuccess(30), 500);
    },
    ...mapMutations(["setToken"]),
    // 测试存储vuex的数据
    testCommit() {
      this.setToken(this.$u.guid());
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
