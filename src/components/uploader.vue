<template>
  <input
    type="file"
    class="uploader"
    @change="handleAddImg"
    ref="uploader"
    :multiple="action=='multiple'"
    accept="image/png,image/jpeg,image/gif,image/jpg"
  />
</template>
<script>
import fileApi from '@/api/file'
import Vue from 'vue'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui';

Vue.component(Toast.name, Toast)

export default {
  props: {
    // single：单图 multiple：多图
    action: {
      default: 'single',
      type: String,
    },
    // 可上传图片数量
    maxLen: {
      default: 1,
      type: Number,
    },
    maxSize: {
      default: 10*1024*1024,
      type: Number,
    },
  },
  components: {},
  data() {
    return {
      formData: new FormData(),
      imgs: {},//预览的图片合集
      imgLen: 0 ,//初始化图片数量
      file:{},//每次上次的图片信息
      imgUrl: {},//上传服务器之后的图片对象 key为图片名称，value为图片的url
    }
  },
  mounted() {
    
  },
  methods: {
    handleAddImg() {
      let inputDOM = this.$refs.uploader;// 通过DOM取文件数据
      this.file = inputDOM.files; //拿到最新一张图的信息
      let oldLen = this.imgLen;//已有图片数量
      let len = this.file.length + oldLen;//加上最新图片数量
      if (len > this.maxLen && this.action === 'multiple') {//超出数量提示
        Toast(`最多可上传${this.maxLen}张，您还可以上传${4 - oldLen}张`)
        return false;
      }
      for (let i=0; i < this.file.length; i++) {//多选时需要渲染渲染
        let size = Math.floor(this.file[i].size);//获得图片大小
        if (size > this.maxSize) {//超出大小提示
            Toast(`请选择${this.maxSize/1024/1924}MB以内的图片！`);
            return false;
        }
        if (this.action === 'single' && this.imgLen > 0) {
          this.$delete(this.imgs, Object.keys(this.imgs)[0])
        }
        this.imgLen++;
        this.$set(//存入图片的file到对象
          this.imgs,
          this.file[i].name + "?" + new Date().getTime(),
          this.file[i]
        );
        console.log(this.imgs);
        this.$emit('notice', 'preview')
      }
    },
    // 获取预览图地址并渲染预览图
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {// basic
          url = window.createObjectURL(file);//
      } else if (window.URL != undefined) {// mozilla(firefox)
          url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {// webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
      }
      return url;
    },
    getPreviewImgs() {
      let previewUrl = {}
      for (const key in this.imgs) {
        const element = this.imgs[key];
        previewUrl[key] = this.getObjectURL(element)
      }
      return previewUrl
    },
    //点击删除所选图片
    deleteImg(index) {
      this.$delete(this.imgs, index)
      this.$emit('notice', 'delete')
      this.imgLen--;
    },
    handleUpload() {
      for (let key in this.imgs) {
        let name = key.split("?")[0];
        this.formData.append("files", this.imgs[key], name);
      }
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      fileApi.upload(this.formData).then((res) => {
        if (res.status === "success") {
          Indicator.close();
          this.imgUrl = Object.values(res.data)
          this.$emit('notice', 'upload')
        }
      })
    },
    getUploadImg() {
      return this.imgUrl
    }
  },
}
</script>
<style lang="scss" scoped>
.uploader {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  outline: none;
  background-color: transparent;
  filter:alpha(opacity=0);
  opacity: 0;
}
</style>