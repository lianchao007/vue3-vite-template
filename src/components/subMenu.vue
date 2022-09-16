<!--
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2022-09-16 11:01:54
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 11:01:54
-->
<!--
 * @Descripttion: 菜单子组件
 * @version: 
 * @Author: lc
 * @Date: 2022-02-24 09:48:03
 * @LastEditors: lc
 * @LastEditTime: 2022-09-15 09:39:18
-->
<template>
  <el-sub-menu :index="menu.id" v-if="menu.children && menu.children.length">
    <template #title>
      <span class="iconfont" v-if="menu.icon" v-html="menu.icon"></span>
      <img
        :class="menu.System ? 'menu_img_normal' : 'menu_img'"
        :src="getUrl(menu.img)"
        v-else-if="menu.img"
        alt=""
      />
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-sub-menu>
  <el-menu-item :index="menu.id" :route="menu.route" v-else>
    <i class="iconfont" v-if="menu.icon" v-html="menu.icon"></i>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>
<script setup name="subMenu">
import subMenu from "components/subMenu.vue";
const props = defineProps({
  menu: {
    type: Object,
    default: undefined,
  },
});
const getUrl = (url) => {
  return new URL(`../assets/img/index/menu/${url}.png`, import.meta.url).href;
};
</script>
<style lang="scss" scoped>
.iconfont {
  margin-right: 5px;
}
.menu_img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.el-menu--collapse {
  .menu_img_normal {
    width: 20px;
  }
}
:deep(.el-menu-item.is-active) {
  background: rgba(42, 53, 78, 178);
}
</style>