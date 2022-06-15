export default (vm) => {
  Object.keys(vm.$u.props).forEach((componentName) => {
    // 重置部分组件的字体大小为rem以及默认颜色调整
    const component = vm.$u.props[componentName];
    if (component.bgColor) component.bgColor = "var(--inverse)";
    if (component.fontSize) component.fontSize = "1rem";
    if (component.loadingSize) component.loadingSize = "1rem";
    if (component.size) {
      const arr = ["text", "icon"];
      if (arr.includes(componentName)) component.size = "1rem";
      if (componentName === "loadingIcon") component.size = "1.5rem";
    }
  });
};
