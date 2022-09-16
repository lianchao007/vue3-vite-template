<!--
 * @Descripttion: 修改密码
 * @version: 
 * @Author: lc
 * @Date: 2022-02-23 15:45:20
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 11:14:11
-->
<template>
  <el-form
    :model="editForm"
    :rules="rules"
    ref="formRef"
    label-width="160px"
    v-loading="loading"
  >
    <el-form-item label="用户账号：" prop="username">
      <el-input v-model="editForm.username" readonly></el-input>
    </el-form-item>
    <el-form-item label="原密码：" prop="old_password">
      <el-input
        v-model="editForm.old_password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码：" prop="new_password">
      <el-input
        v-model="editForm.new_password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码：" prop="check_password">
      <el-input
        v-model="editForm.check_password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label-width="0">
      <div style="margin: 0 auto">
        <el-button class="default_btn" @click="closeDialog(false)">取消</el-button>
        <el-button class="primary_btn" type="primary" @click="save">确定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script setup name="password">
// import { useStore } from "vuex";
import { ElMessage } from "element-plus";
// const store = useStore();
const emit = defineEmits(["closeDialog"]);
const $api = inject("$api");
const loading = ref(false);
const editForm = reactive({
  // id: store.state.userId,
  // username: store.state.UserName,
  new_password: "",
  check_password: "",
  old_password: "",
});
const checkPassword = (rule, value, callback) => {
  if (editForm.new_password == value) {
    callback();
  } else {
    callback(new Error("两次新密码不相符"));
  }
};
const testPassword = (rule, value, callback) => {
  let reg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+=|{}':;',\[\].<>/?\uff01\uffe5\u2026\uff08\uff09\u2014\u3010\u3011\u2018\u2019\uff1b\uff1a\u201c\u201d\u3002\uff0c\u3001\uff1f])[A-Za-z\d~!@#$%^&*()+=|{}':;',\[\].<>/?\uff01\uffe5\u2026\uff08\uff09\u2014\u3010\u3011\u2018\u2019\uff1b\uff1a\u201c\u201d\u3002\uff0c\u3001\uff1f]{6,12}$/;
  if (!value) {
    callback(new Error("请输入由字母、数字和字符组成的6位到12位密码"));
  } else {
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error("请输入由字母、数字和字符组成的6位到12位密码"));
    }
  }
};
const rules = reactive({
  old_password: [
    { required: true, message: "此内容必须填写", trigger: "blur" },
  ],
  new_password: [
    { required: true, message: "此内容必须填写", trigger: "blur" },
    { validator: testPassword, trigger: "blur" },
  ],
  check_password: [
    { required: true, message: "此内容必须填写", trigger: "blur" },
    { validator: checkPassword, trigger: "blur" },
  ],
});
const formRef = ref();
const closeDialog = (isReload = false) => {
  emit("closeDialog", "Password", isReload);
};

const getData = async () => {};
const save = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      let res = await $api.universal.modification(editForm);
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

onMounted(() => {
  getData();
});
</script>