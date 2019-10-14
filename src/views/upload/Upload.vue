<template>
  <div class="container">
    <div class="content">
      <div class="picture-detail">
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
        <div id="map"></div>
      </div>
      <div class="picture-block">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="照片名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <div class="l">
              <el-select
                v-model="form.province"
                placeholder="省"
                @change="searchMapData"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.adcode"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
              <el-col class="line" :span="1" />
              <el-select
                v-model="form.city"
                placeholder="市"
                @change="searchMapData"
              >
                <el-option
                  v-for="item in cityList"
                  :key="item.adcode"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
              <el-col class="line" :span="1" />
              <el-select
                v-model="form.district"
                placeholder="区"
                @change="searchMapData"
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
          <el-form-item label="具体位置">
            <el-input
              v-model="form.detail_address"
              placeholder="请输入内容"
              id="search"
              name="search"
            ></el-input>
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
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        detail_address: ""
      },
      map: {},
      district: {},
      polygons: [],
      provinceList: [],
      cityList: [],
      regionList: []
    };
  },
  mounted() {
    this.initMaps();
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
      AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], () => {
        const autoOptions = {
          city: "北京", //城市，默认全国
          input: "search" //使用联想输入的input的id
        };
        const autocomplete = new AMap.Autocomplete(autoOptions);
        const placeSearch = new AMap.PlaceSearch({
          city: "北京",
          map: this.map
        });
        console.log(autocomplete);
        AMap.event.addListener(autocomplete, "select", function(e) {
          console.log(e);
          //TODO 针对选中的poi实现自己的功能
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name);
        });
      });
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
