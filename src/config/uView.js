export default (vm) => {
  Object.keys(vm.$u.props).forEach((componentName) => {
    // 重置部分组件的默认颜色调整
    const component = vm.$u.props[componentName];
    if (component.bgColor) component.bgColor = "var(--inverse)";
  });
};
