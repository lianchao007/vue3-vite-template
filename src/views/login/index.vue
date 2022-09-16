<!--
 * @Descripttion: 登录
 * @version: 
 * @Author: lc
 * @Date: 2022-02-15 10:40:35
 * @LastEditors: lc
 * @LastEditTime: 2022-09-15 09:29:12
-->

<template>
  <div class="login_page">
    <div class="login_form">
      <img class="login_title" src="../../assets/img/login/title.png" alt="" />
      <el-form
        ref="formRef"
        :model="form"
        label-width="0"
        class="login_form_main"
        size="large"
        :rules="rules"
        v-loading="loading"
        inline
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            clearable
            style="width: 324px"
          >
            <template #prefix>
              <img class="form_icon" src="../../assets/img/login/user.png" alt="">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="密码"
            clearable
            style="width: 324px"
          >
            <template #prefix>
              <img class="form_icon" src="../../assets/img/login/psd.png" alt="">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="login_btn"
            >登录</el-button
          >
        </el-form-item>
        <br />
        <el-form-item>
          <el-checkbox v-model="remember" label="记住密码"></el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <p class="login_copyright">
      {{ $store.state.copyright }}
    </p>
  </div>
</template>
<script setup name="login">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Base64 } from "js-base64";
import { routeData } from "assets/data/routeData.js";
import utils from "utils/utils.js";
import { Lock, UserFilled } from "@element-plus/icons-vue";
import md5 from "js-md5";
const { getStorage, setStorage, removeStorage } = utils;
const store = useStore();
const router = useRouter();
const $api = inject("$api");
// 参数
const formRef = ref();
const remember = ref(!!getStorage("username"));
const loading = ref(false);
const form = reactive({
  username: getStorage("username"),
  password: Base64.decode(getStorage("password")),
});
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
const login = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      // router.options.routes[1].children = routeData
      // router.addRoute(router.options.routes[1])
      router.push("/");
      // loading.value = true;
      // let res = await $api.login({
      //   username: form.username,
      //   password: md5(form.password)
      // });
      // loading.value = false;
      // if (res.status === 200) {
      //   if (remember.value) {
      //     setStorage("username", form.username);
      //     setStorage("password", Base64.encode(form.password));
      //   } else {
      //     removeStorage("username");
      //     removeStorage("password");
      //   }
      //   sessionStorage.setItem("token", res.data.access);
      //   store.commit("setName", res.data.Name);
      //   store.commit("setUserName", res.data.UserName);
      //   router.push("/");
      // }
    } else {
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.login_page {
  height: 100%;
  background: url(img/login/bg.png) no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: auto;
  .login_form {
    position: absolute;
    width: 920px;
    height: 450px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    .login_title {
      margin: 25px auto;
      display: block;
    }
    .login_btn {
      width: 168px;
      background: #00e1ff;
      font-weight: bold;
      color: #0d245f;
      font-size: 16px;
    }
    .form_icon {
      width: 24px;
    }
  }
  .login_copyright {
    font-size: 16px;
    width: 100%;
    color: rgba(255, 255, 255, 0.2);
    text-align: center;
    position: absolute;
    bottom: 50px;
  }
}
:deep(.el-input__wrapper) {
  background: rgba(174, 207, 255, 0.2);
  box-shadow: none;
}
:deep(.el-input__inner) {
  color: #fff;
}
:deep(.el-checkbox__inner) {
  background: rgba(174, 207, 255, 0.2);
  border-color: rgba(174, 207, 255, 0.2);
}
.el-checkbox {
  color: #fff;
}
</style>
