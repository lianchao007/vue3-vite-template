<!--
 * @Descripttion: 首页头部
 * @version: 
 * @Author: lc
 * @Date: 2022-02-15 16:41:01
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 11:17:01
-->
<template>
  <div class="header">
    <div class="header_left">
      <!-- <i></i> <span>{{ $store.state.companyName }}</span> -->
    </div>
    <div class="header_center"></div>
    <div class="header_right">
      <el-dropdown @command="handleCommand" style="color: #fff">
        <el-avatar
          :size="36"
          :src="circleUrl"
          style="vertical-align: middle; margin-right: 10px"
        >
        </el-avatar>
        <span style="font-size: 18px"
          >{{ userInfo.Name
          }}<b style="font-size: 14px">({{ userInfo.username }})</b></span
        >
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="changePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <div class="mystyle_dialog" v-if="dialog.PersonalInfo">
    <el-dialog v-model="dialog.PersonalInfo" title="个人信息" width="600px">
      <personal-info @closeDialog="closeDialog" :userInfo="userInfo" />
    </el-dialog>
  </div>
  <div class="mystyle_dialog" v-if="dialog.Password">
    <el-dialog v-model="dialog.Password" title="修改密码" width="500px">
      <password-com @closeDialog="closeDialog" />
    </el-dialog>
  </div>
</template>
<script setup name="header-com">
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { BellFilled, CircleCloseFilled } from "@element-plus/icons-vue";

import PasswordCom from "components/password.vue";
import PersonalInfo from "components/personalInfo.vue";
const $api = inject("$api");
const router = useRouter();
const route = useRoute();
const activeUrl = ref(route.matched[0].name);
const circleUrl = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const userInfo = reactive({});
const dialog = reactive({
  Password: false,
  PersonalInfo: false,
});
const closeDialog = (com, isReload) => {
  dialog[com] = false;
  isReload && getUserInfo();
};
const handleCommand = (command) => {
  if (command === "changePassword") {
    dialog.Password = true;
  } else if (command === "userInfo") {
    dialog.PersonalInfo = true;
  } else if (command === "exit") {
    exit();
  }
};
const exit = () => {
  ElMessageBox.confirm("是否退出账号，回到登录页面?", "退出提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await $api.logout();
      if (res.status === 200) {
        // store.commit("setName", "");
        // store.commit("setUserName", "");
        // sessionStorage.removeItem("token");
        // ElMessage({
        //   type: "success",
        //   message: "登出成功",
        // });
        // setTimeout(() => {
        //   router.push("/login");
        // }, 1000);
      }
    })
    .catch(() => {});
};
const toUrl = (name) => {
  activeUrl.value = name;
  router.push("/" + name);
};
onMounted(() => {
  // getUserInfo();
});
</script>
<style lang="scss" scoped>
.header {
  height: 5rem;
  background: linear-gradient(90deg, #07439d, #0f51b2, #3272c7);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .header_left {
    font-size: 1.75rem;
    font-weight: bold;
    i {
      width: 3rem;
      height: 3rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      background: url(img/index/icon.png) no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .header_center {
    margin-right: 20vw;
    height: 100%;
    li {
      padding: 0 2rem;
      float: left;
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 1.25rem;
      box-sizing: border-box;
      border-top: 4px solid transparent;
      font-family: "Source Han Sans CN";
      font-weight: bold;
      cursor: pointer;
      &.active,
      &:hover {
        background: linear-gradient(
          90deg,
          rgba(55, 124, 255, 0.5),
          rgba(94, 170, 255, 0.5)
        );
        border-top: 4px solid #26c9ff;
      }
    }
  }
}

@media screen and (max-width: 925px) {
  .header_left > span {
    display: none;
  }
}
</style>