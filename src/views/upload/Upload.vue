<template>
  <div class="container">
    <div class="content">
      <div class="picture-detail">
        <div :class="['upload-block', { 'have-image': uploadImage }]">
          <input type="file" class="file" @change="uploadFile" />
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
        <div id="map"></div>
      </div>
      <div class="picture-block">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="照片名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="province">
            <div class="l">
              <el-select
                v-model="form.province"
                placeholder="省"
                @change="searchProvinceMapData"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.adcode"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
              <el-col class="line" :span="1" prop="city" />
              <el-select
                v-model="form.city"
                placeholder="市"
                @change="searchCityMapData"
                :disabled="disabledCity"
              >
                <el-option
                  v-for="item in cityList"
                  :key="item.adcode"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
              <el-col class="line" :span="1" prop="region" />
              <el-select
                v-model="form.district"
                placeholder="区"
                @change="searchRegionMapData"
                :disabled="disabledRegion"
              >
                <el-option
                  v-for="item in regionList"
                  :key="item.adcode"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="具体位置" prop="detail_address">
            <el-input
              v-model="form.detail_address"
              placeholder="请输入内容"
              id="search"
              name="search"
              @change="searchKeyWords"
            ></el-input>
          </el-form-item>
          <el-form-item label="具体位置" prop="detail_address">
            <el-autocomplete
              v-model="form.detail_address"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="活动时间" prop="date">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="照片标签" prop="tags">
            <el-checkbox-group v-model="form.tags">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="照片状态" prop="publish">
            <el-radio-group v-model="form.publish">
              <el-radio label="published">发布</el-radio>
              <el-radio label="unpublished">取消</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="照片描述" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')"
              >立即上传</el-button
            >
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="a"></div>
  </div>
</template>
<script>
import axios from "axios";
const CHINA = "中国";
export default {
  name: "upload",
  data() {
    return {
      action: process.env.VUE_APP_UPLOAD_URL,
      form: {
        name: "",
        province: "",
        district: "",
        region: "",
        date: "",
        tags: [],
        publish: "",
        desc: "",
        detail_address: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入照片名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        province: [
          { required: true, message: "请选择照片所在的省", trigger: "change" }
        ],
        district: [
          { required: true, message: "请选择照片所在的市", trigger: "change" }
        ],
        region: [
          { required: true, message: "请选择照片所在的区", trigger: "change" }
        ],
        detail_address: [
          { required: true, message: "请输入照片详细地址", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        tags: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个标签",
            trigger: "change"
          }
        ],
        publish: [
          { required: true, message: "请选择照片状态", trigger: "change" }
        ]
      },
      map: {},
      district: {},
      polygons: [],
      provinceList: [],
      cityList: [],
      regionList: [],
      uploadImage: "",
      Autocomplete: null,
      PlaceSearch: null,
      disabledCity: true,
      disabledRegion: true
    };
  },
  mounted() {
    this.initMaps();
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
    },
    uploadFile(e) {
      const uploadData = new FormData();
      const file = e.target.files[0];
      uploadData.append(file.name, file);
      this.uploadImage = URL.createObjectURL(file);
      axios.post(process.env.VUE_APP_UPLOAD_URL, uploadData).then(() => {
        e.target.files = null;
      });
    },
    initMaps() {
      const opts = {
        subdistrict: 1, //返回下一级行政区
        showbiz: false //最后一级返回街道信息
      };
      this.map = new AMap.Map("map", {
        resizeEnable: true,
        center: [116.30946, 39.937629],
        zoom: 3,
        keyboardEnable: false
      });
      this.district = new AMap.DistrictSearch(opts); //注意：需要使用插件同步下发功能才能这样直接使用
      this.district.search(CHINA, (status, result) => {
        if (status == "complete") {
          this.getMapData(result.districtList[0], "init");
        }
      });
      this.Autocomplete = new AMap.Autocomplete({
        city: "北京", //城市，默认全国
        input: "search" //使用联想输入的input的id
      });
      this.PlaceSearch = new AMap.PlaceSearch({
        city: "北京",
        map: this.map,
        type: "风景名胜|餐饮服务",
        extensions: "all",
        pageSize: 30
      });
      this.map.plugin(this.Autocomplete);
      this.map.plugin(this.PlaceSearch);
    },
    getMapData(data, level) {
      const bounds = data.boundaries;
      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          let polygon = new AMap.Polygon({
            map: this.map,
            strokeWeight: 1,
            strokeColor: "#0091ea",
            fillColor: "#80d8ff",
            fillOpacity: 0.2,
            path: bounds[i]
          });
          this.polygons.push(polygon);
        }
        this.map.setFitView(); //地图自适应
      }
      console.log(data.districtList);
      if (level === "province") {
        this.cityList = data.districtList;
      } else if (level === "city") {
        this.regionList = data.districtList;
      } else if (level === "init") {
        this.provinceList = data.districtList;
      }
    },
    searchMapData(obj) {
      for (let i = 0, l = this.polygons.length; i < l; i++) {
        this.polygons[i].setMap(null);
      }
      const { adcode, level, name } = obj;
      this.district.setLevel(level);
      this.form[level] = name;
      this.district.setExtensions("all");
      this.district.search(adcode, (status, result) => {
        if (status === "complete") {
          this.getMapData(result.districtList[0], level);
        }
      });
    },
    searchProvinceMapData(obj) {
      this.disabledCity = false;
      this.searchMapData(obj);
    },
    searchCityMapData(obj) {
      this.disabledRegion = false;
      this.searchMapData(obj);
    },
    searchRegionMapData(obj) {
      const { adcode, name } = obj;
      this.PlaceSearch.setCity(adcode);
      this.PlaceSearch.search(name);
      this.PlaceSearch.on("markerClick", e => {
        console.log(e);
      });
    },
    searchKeyWords() {},
    querySearchAsync(queryString, cb) {
      if (!queryString) return cb([]);
      this.Autocomplete.search(queryString);
      this.Autocomplete.on("complete", e => {
        const cityArray = e.tips.map(v => {
          return {
            ...v,
            value: v.name
          };
        });
        cb(cityArray);
      });
    },
    handleSelect(city) {
      const { adcode, name } = city;
      this.PlaceSearch.setCity(adcode);
      this.PlaceSearch.search(name);
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
  .content {
    display: flex;
    .picture-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-right: 25px;
      .upload-block {
        width: 400px;
        height: 250px;
        border: 2px dashed black;
        position: relative;
        .file {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .icon-upload {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
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
      #map {
        width: 404px;
        height: 250px;
      }
    }
    .picture-block {
      width: 600px;
      max-height: 600px;
    }
  }
}
.l {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
