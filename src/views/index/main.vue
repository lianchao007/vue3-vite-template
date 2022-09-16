<!--
 * @Descripttion: 首页主题
 * @version: 
 * @Author: lc
 * @Date: 2022-02-15 16:41:08
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 14:23:10
-->
<template>
  <div class="container">
    <aside :style="`width: ${isCollapse ? 'auto' : '226px'} ;`">
      <el-menu
        active-text-color="#fff"
        background-color="rgba(0,0,0,0)"
        :default-active="activeRoute"
        text-color="#fff"
        :collapse="isCollapse"
        router
      >
        <sub-menu v-for="item in menuList" :key="item.id" :menu="item" />
      </el-menu>
      <div class="collapse_box">
        <el-button
          text
          class="default_text_btn"
          :icon="isCollapse ? Expand : Fold"
          @click="isCollapse = !isCollapse"
        >
        </el-button>
      </div>
    </aside>
    <main>
      <router-view v-if="isRouterAlive" />
    </main>
  </div>
</template>
<script setup name="main-com">
import { ArrowDown, Fold, Expand } from "@element-plus/icons-vue";
import vc_logo_color from "img/index/menu/videoCloud/vc_logo_color.png";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";
import subMenu from "components/subMenu.vue";
import { menuData } from "assets/data/menuList.js";
import { useRoute, useRouter } from "vue-router";
const $api = inject("$api");
const route = useRoute();
const router = useRouter();
const section = ref("operation_maintenance");
const menuList = ref(menuData);
const isCollapse = ref(false);
const isRouterAlive = ref(true);
const activeRoute = ref(route.name);
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100% - 80px);
  aside {
    background: #212a3d;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .el-menu {
      border-right: none;
      flex: 1;
      overflow: auto;
    }
  }
  main {
    flex: 1;
    background: #f0f0f0;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 0;
    overflow: auto;
  }
}
:deep(.el-sub-menu__title) {
  line-height: 68px;
  height: 68px;
  font-size: 16px;
}
:deep(.el-sub-menu .el-menu-item) {
  // border-left: 5px solid transparent;
  line-height: 68px;
  height: 68px;
  font-size: 16px;
}
:deep(.el-menu-item.is-active) {
  background: rgba(42, 53, 78, 178);
}
.collapse_box {
  text-align: center;
  padding: 5px 0;
  :deep(.el-button.is-text:not(.is-disabled):focus) {
    background: rgba(42, 53, 78, 178);
  }
  :deep(.el-button.is-text:not(.is-disabled):hover) {
    background: rgba(42, 53, 78, 178);
  }
}
.el-menu {
  & > :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
    background: url("img/index/selectMenu.png") no-repeat center center !important;
    background-size: 100% 100%;
  }
}
.el-dropdown {
  font-weight: bold;
  color: #333333;
  cursor: pointer;
  font-size: 16px;
}
.el-divider--vertical {
  margin: 0 15px;
}
.default_text_btn {
  font-size: 24px;
}
</style>