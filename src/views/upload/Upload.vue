<template>
  <div class="container">
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
</template>
<script>
import axios from "axios";
export default {
  name: "upload",
  data() {
    return {
      action: process.env.VUE_APP_UPLOAD_URL
    };
  },
  mounted() {
    console.log(this.action);
  },
  methods: {
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
  width: 400px;
  height: 150px;
  position: relative;
  border: 2px dashed black;
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
</style>
