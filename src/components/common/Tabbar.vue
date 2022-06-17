<template>
  <view class="tabbar">
    <u-tabbar border :value="getCurrRouteName" @change="changeTab">
      <u-tabbar-item
        v-for="(tab, idx) in tabList"
        :key="idx"
        :name="tab.router"
        :text="tab.text"
        :icon="tab.icon"
        :dot="tab.dot || false"
        :badge="tab.badge || null"
      />
    </u-tabbar>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tabbar",
  methods: {
    changeTab(routerName) {
      this.$Router.pushTab({ name: routerName });
    },
  },
  computed: {
    ...mapState("app", ["tabList"]),
    getCurrRouteName() {
      return this.$Route.name;
    },
  },
};
</script>
