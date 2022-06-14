<template>
  <view class="token-btns">
    <text>当前token: {{ token || "null" }}</text>
    <u-button type="primary" text="存储token" @click="randToken" />
    <u-button type="error" text="移除token" @click="removeToken" />
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "TokenBtns",
  computed: {
    ...mapState("user", ["token"]),
  },
  methods: {
    ...mapMutations("user", ["setToken"]),
    randToken() {
      this.setToken(this.$u.guid());
    },
    removeToken() {
      this.setToken(null);
    },
  },
};
</script>
