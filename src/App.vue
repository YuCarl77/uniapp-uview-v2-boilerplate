<script>
// 使用了局部混入初始化深色模式,没有必要全局混入onLaunch生命周期,该周期只会加载一次
import darkMode from "@/mixins/local/darkMode";
export default {
  name: "main",
  mixins: [darkMode],
};
</script>

<style lang="scss">
// 1. scss认识后缀,不需要写全
// 2. 不需要生成为css文件的scss，应当以_开头命名
@import "@/assets/styles/common";
</style>
