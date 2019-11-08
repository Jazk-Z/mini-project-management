<template>
  <VContent :title="title" :route="route">
    <template #body>
      <div class="create-banner">
        <UploadImage ref="upload" @upload-success="handleFile"></UploadImage>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="form"
        >
          <el-form-item label="Banner展示时间" prop="time">
            <el-date-picker
              v-model="ruleForm.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Banner状态" prop="publish">
            <el-radio-group v-model="ruleForm.publish">
              <el-radio label="published">发布</el-radio>
              <el-radio label="unpublished">取消</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Banner描述" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="Banner路径跳转" prop="path">
            <el-input v-model="ruleForm.path"></el-input>
          </el-form-item>
          <el-form-item label="Banner所属" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="mini">微信小程序</el-radio>
              <el-radio label="rn">React Native</el-radio>
              <el-radio label="web">WEB端</el-radio>
              <el-radio label="native">原生端</el-radio>
              <el-radio label="flutter">Flutter</el-radio>
            </el-radio-group>
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
  </VContent>
</template>
<script>
import UploadImage from "@/components/Upload/Upload";
import VContent from "@/components/VContent";
import { createBanner } from "@/services/banner";
import { Message } from "element-ui";
export default {
  name: "CreateBanners",
  data() {
    return {
      title: "创建Banner",
      route: [
        {
          name: "Banner",
          path: "/"
        },
        {
          name: "创建Banner"
        }
      ],
      fileData: new FormData(),
      ruleForm: {
        description: "",
        publish: "",
        time: [],
        path: "",
        type: ""
      },
      rules: {
        publish: [
          { required: true, message: "请选择照片状态", trigger: "change" }
        ],
        description: [
          { required: true, message: "请填写活动形式", trigger: "blur" }
        ],
        time: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        path: [
          { required: true, message: "请输入Banner跳转路径", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择Banner所属", trigger: "change" }
        ]
      },
      existImageUrl: null
    };
  },
  components: {
    UploadImage,
    VContent
  },
  provide() {
    return {
      fileData: this.fileData
    };
  },
  methods: {
    handleTime() {
      this.fileData.append("start_time", this.ruleForm.time[0]);
      this.fileData.append("end_time", this.ruleForm.time[1]);
      this.fileData.append("description", this.ruleForm.description);
      this.fileData.append("publish", this.ruleForm.publish);
      this.fileData.append("path", this.ruleForm.path);
      this.fileData.append("type", this.ruleForm.type);
      return this.fileData;
    },
    handleFile() {
      this.existImageUrl = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.existImageUrl) {
          createBanner(this.handleTime())
            .then(() => {
              Message.success("上传成功");
              this.resetForm("ruleForm");
            })
            .catch(() => {
              Message.error("上传失败");
              this.resetForm("ruleForm");
            });
        } else {
          Message.warning("参数验证失败");
          this.resetForm("ruleForm");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.existImageUrl = null;
      this.fileData = new FormData();
      this.$refs.upload.clear();
    }
  },
  watch: {
    startTime() {}
  }
};
</script>
<style lang="scss" scoped>
.create-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  .form {
    margin-left: 40px;
  }
  .line {
    text-align: center;
  }
}
</style>
