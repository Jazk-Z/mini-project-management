<template>
  <div class="tags">
    <div class="tags-form-block">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="标签名称">
          <el-input v-model="form.key_word"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { createTag } from "@/services/tag";
export default {
  name: "create-tags",
  data() {
    return {
      form: {
        key_word: ""
      },
      rules: {
        key_word: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          createTag(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.tags {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .tags-form-block {
    width: 400px;
    height: 400px;
  }
}
</style>
