<template>
  <div class="container">
    <div class="upload-block">
      <input type="file" multiple class="file" @change="uploadFile" />
      <div class="icon-upload">
        <div class="icon">
          <img src="../../assets/upload.svg" alt="upload" />
        </div>
        <div class="text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </div>
    </div>
    <div class="picture-block">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="照片名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="是否展示">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="照片标签">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="照片描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即上传</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "upload",
  data() {
    return {
      action: process.env.VUE_APP_UPLOAD_URL,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  mounted() {
    console.log(this.action);
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    uploadFile(e) {
      const uploadData = new FormData();
      const files = e.target.files;
      Array.from(files).map(file => {
        uploadData.append(file.name, file);
      });
      axios.post(process.env.VUE_APP_UPLOAD_URL, uploadData).then(() => {
        e.target.files = null;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  .upload-block {
    width: 400px;
    height: 250px;
    border: 2px dashed black;
    position: relative;
    .file {
      width: 400px;
      height: 150px;
      opacity: 0;
    }
    .icon-upload {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: -1;
      .icon {
        width: 70px;
        height: 70px;
        img {
          display: block;
          width: 70px;
          height: 70px;
        }
      }
      .text {
        color: #606266;
        font-size: 14px;
        text-align: center;
        em {
          color: #409eff;
          font-style: normal;
        }
      }
    }
  }
  .picture-block {
    width: 600px;
    max-height: 600px;
  }
}
</style>
