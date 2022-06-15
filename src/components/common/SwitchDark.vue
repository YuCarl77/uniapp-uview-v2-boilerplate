<template>
  <u-cell-group class="switch-dark" :border="false">
    <u-cell title="深色模式">
      <u-switch slot="value" :value="darkMode" @change="setDarkMode" />
    </u-cell>
  </u-cell-group>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "SwitchDark",
  computed: {
    ...mapState("app", ["darkMode"]),
  },
  methods: {
    ...mapMutations("app", ["setDarkMode"]),
  },
};
</script>
<style lang="scss" scoped>
.switch-dark {
  background: $inverse;
}
</style>
