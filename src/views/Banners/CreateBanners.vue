<template>
  <div class="create-banner">
    <UploadImage ref="upload"></UploadImage>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item label="Banner生效时间" required>
        <el-col :span="11">
          <el-form-item prop="start-date">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm['start-date']"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="start-time">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm['start-time']"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Banner失效时间" required>
        <el-col :span="11">
          <el-form-item prop="end-date">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm['end-date']"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="end-time">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm['end-time']"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="照片状态" prop="publish">
        <el-radio-group v-model="ruleForm.publish">
          <el-radio label="published">发布</el-radio>
          <el-radio label="unpublished">取消</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="照片描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import UploadImage from "@/components/Upload/Upload";
export default {
  name: "CreateBanners",
  data() {
    return {
      fileData: new FormData(),
      ruleForm: {
        description: "",
        publish: ""
      },
      rules: {
        publish: [
          { required: true, message: "请选择照片状态", trigger: "change" }
        ],
        description: [
          { required: true, message: "请填写活动形式", trigger: "blur" }
        ],
        "start-date": [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        "start-time": [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        "end-date": [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        "end-time": [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    UploadImage
  },
  provide() {
    return {
      fileData: this.fileData
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
.create-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  .line {
    text-align: center;
  }
}
</style>
