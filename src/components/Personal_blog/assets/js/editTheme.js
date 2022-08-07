// 更改页面颜色
import { themes } from "./moduleColor";
// 修改页面中的样式变量值
const changeStyle = (obj) => {
  for (let key in obj) {
    document
      .getElementById("music_player")
      .style.setProperty(`--${key}`, obj[key]);
  }
};
// 改变主题的方法
export const setTheme = (themeName) => {
  localStorage.setItem("theme", themeName); // 保存主题到本地，下次进入使用该主题
  const themeConfig = themes[themeName];
  // 如果有主题名称，那么则采用我们定义的主题
  if (themeConfig) {
    localStorage.setItem("primaryColor", themeConfig.primaryColor); // 保存主题色到本地
    localStorage.setItem("primaryTextColor", themeConfig.primaryTextColor); // 保存文字颜色到本地
    localStorage.setItem("primarySideColor", themeConfig.primarySideColor); // 保存侧边颜色到本地
    localStorage.setItem("primarySideTextColor", themeConfig.primarySideTextColor); // 保存侧边字体到本地
    localStorage.setItem("filmColorLeft", themeConfig.filmColorLeft); // 保存胶片左边阴影到本地
    localStorage.setItem("filmColorRight", themeConfig.filmColorRight); // 保存胶片右边阴影到本地
    localStorage.setItem("active", themeConfig.active); // 保存胶片右边阴影到本地
    changeStyle(themeConfig); // 改变样式
  } else {
    let themeConfig = {
        primaryColor: localStorage.getItem("primaryColor"),
        primaryTextColor: localStorage.getItem("primaryTextColor"),
        primarySideColor: localStorage.getItem("primarySideColor"),
        primarySideTextColor: localStorage.getItem("primarySideTextColor"),
        filmColorLeft: localStorage.getItem("filmColorLeft"),
        filmColorRight: localStorage.getItem("filmColorRight"),
        active: localStorage.getItem("active"),
    };
    changeStyle(themeConfig);
  }
};
