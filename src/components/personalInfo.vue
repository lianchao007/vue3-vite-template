<!--
 * @Descripttion: 个人信息
 * @version: 
 * @Author: lc
 * @Date: 2022-02-23 16:42:27
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 11:13:45
-->
<template>
  <div class="personalInfo">
    <div class="personalInfo_top">
      <div class="personalInfo_left">
        <el-avatar :size="100" :src="defaultPhoto"></el-avatar>
      </div>
      <div class="personalInfo_right">
        <el-form
          :model="editForm"
          :rules="rules"
          ref="formRef"
          label-width="120px"
          v-loading="loading"
        >
          <el-form-item label="账号：" prop="username">
            <el-input v-model="editForm.username" readonly></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="Name">
            <el-input v-model="editForm.Name" readonly></el-input>
          </el-form-item>
          <el-form-item label="昵称：" prop="nick_name">
            <el-input v-model="editForm.nick_name" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="contact">
            <el-input v-model="editForm.contact" :maxlength="11"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="personalInfo_bottom">
      <el-button class="default_btn" @click="closeDialog(false)">取消</el-button>
      <el-button class="primary_btn" type="primary" @click="save">确定</el-button>
    </div>
  </div>
</template>
<script setup name="personalInfo">
// import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import defaultPhoto from "img/index/default_photo.png";
// const store = useStore();
const emit = defineEmits(["closeDialog"]);
const $api = inject("$api");
const loading = ref(false);
const props = defineProps({
  userInfo: {
    type: Object,
    default: {},
  },
});
const phoneReg = /^1[3|4|5|8][0-9]\d{4,8}$/;
const checkContact = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("联系方式不能为空"));
  }
  if (!phoneReg.test(value)) {
    callback(new Error("请输入正确格式的手机号码"));
  }
  callback();
};
const editForm = reactive({
  username: props.userInfo.username,
  Name: props.userInfo.Name,
  nick_name: props.userInfo.nick_name,
  contact: props.userInfo.contact,
});
const rules = reactive({
  nick_name: [{ required: true, message: "此内容必须填写", trigger: "blur" }],
  contact: [
    { required: true, message: "此内容必须填写", trigger: "blur" },
    { validator: checkContact, trigger: "blur" },
  ],
});
const formRef = ref();
const closeDialog = (isReload = false) => {
  emit("closeDialog", "PersonalInfo", isReload);
};

const save = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      let res = await $api.setUserInfo({
        nick_name: editForm.nick_name,
        contact: editForm.contact,
      });
      loading.value = false;
      if (res.status === 200) {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
        closeDialog(true);
      }
    } else {
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.personalInfo {
  .personalInfo_top {
    display: flex;
    .personalInfo_left {
      width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .personalInfo_right {
      flex: 1;
    }
  }
  .personalInfo_bottom {
    text-align: center;
    margin-top: 10px;
  }
}
</style>