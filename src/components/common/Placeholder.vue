<template>
  <view class="placeholder">
    <view v-for="idx in count" :key="idx">
      {{ idx }}
    </view>
  </view>
</template>

<script>
export default {
  name: "Placeholder",
  props: {
    count: Number,
  },
};
</script>
