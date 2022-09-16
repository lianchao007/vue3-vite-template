<!--
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2022-08-29 11:34:16
 * @LastEditors: lc
 * @LastEditTime: 2022-09-15 09:38:52
-->
<template>
  <div class="error404">
    <div class="bg">
      <p class="tohome_bnt">
        <el-button type="primary" @click="tohome()">回到首页</el-button>
      </p>
    </div>
  </div>
</template>

<script setup name="error404">
import { useRouter } from "vue-router";
const router = useRouter();
const tohome = () => {
  router.push("/");
};
</script>
<style scoped lang="scss">
.error404 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.bg {
  background: url(img/common/505.png) no-repeat center;
  width: 732px;
  height: 290px;
  margin: 0 auto;
  position: relative;
  .tohome_bnt {
    position: absolute;
    right: 15%;
    top: 60%;
  }
}
</style>
