<template>
  <div :class="['upload-block', { 'have-image': uploadImage }]">
    <input type="file" class="file" @change="uploadFile" ref="enforeUpload" />
    <div class="icon-upload">
      <img
        :src="uploadImage"
        alt="upload-image"
        v-if="uploadImage"
        class="upload-icon-block"
      />
      <div class="upload-icon-block" v-if="!uploadImage">
        <div class="icon">
          <img src="../../assets/upload.svg" alt="upload" />
        </div>
        <div class="text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UploadImage",
  data() {
    return {
      uploadImage: ""
    };
  },
  methods: {
    uploadFile(e) {
      const file = e.target.files[0];
      this.fileData.append(file.name, file);
      this.uploadImage = URL.createObjectURL(file);
      this.uploadImage && this.$emit("upload-success");
    },
    clear() {
      console.log(`---------->`);
      this.$refs.enforeUpload.value = null;
      this.uploadImage = "";
    }
  },
  inject: ["fileData"]
};
</script>
<style lang="scss" scoped>
.upload-block {
  width: 400px;
  height: 250px;
  border: 2px dashed black;
  position: relative;
  cursor: pointer;
  .file {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .icon-upload {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    cursor: pointer;
    .upload-icon-block {
      width: 100%;
      height: 100%;
      display: block;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
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
}
.have-image {
  border: 2px dashed lightblue;
}
</style>
