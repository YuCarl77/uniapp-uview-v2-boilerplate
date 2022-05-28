<template>
  <view class="container">
    <u-button type="primary" text="存储token" @click="testCommit" />
    <u-button
      type="warning"
      text="发送请求带toast"
      @click="testRequest(true)"
    />
    <u-button text="发送请求不带toast" @click="testRequest" />
    <HelloWorld />
    <text>token: {{ token || "null" }}</text>
  </view>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("user");
import HelloWorld from "@/components/common/HelloWorld.vue";
export default {
  components: { HelloWorld },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
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
