<template>
  <div class="item-add">
    <div class="form">
      <mt-field 
        placeholder="商品介绍" 
        type="textarea" 
        rows="4" 
        v-model="form.description" 
      />

      <div class="uploader">
        <div class="item add-img">
          <uploader 
            :action="'multiple'" 
            :maxLen="4"
            ref="uploader" 
            @notice="notice"
          />
          <img class="add-button" src="@/assets/images/mine/add.png" />
        </div>
        <div 
          v-for='(item, index) in previewUrl' 
          :key="index" 
          class="item"
        >
        <img class="img" :src="item" />
        <img 
          class="delete" 
          src="@/assets/images/mine/delete.png"
          @click="deleteImg(index)"
        />
        </div>
      </div>

      <mt-field 
        label="商品名称" 
        placeholder="请输入商品名称" 
        v-model="form.title" 
        :state="this.state.title"
      />
      <mt-field 
        label="价格" 
        placeholder="请输入价格，单位元" 
        type="number" 
        v-model="form.price"
        :state="this.state.price"
      />
      <mt-field 
        label="库存" 
        placeholder="请输入库存" 
        type="number" 
        v-model="form.stock"
        :state="this.state.stock"
      />
    </div>
    <div class="add">
      <mt-button 
        class="button" 
        type="primary" 
        size="small"
        @click="handleUpload"
      >
      添加
      </mt-button>
    </div>
  </div>
</template>
<script>
import uploader from '@/components/uploader';
import itemApi from '@/api/item'
import Vue from 'vue'
import { Field } from 'mint-ui'
import { Button } from 'mint-ui'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui';

Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Toast.name, Toast)

export default {
  components: { uploader },
  data() {
    return {
      form: {
        title: '',
        description: '',
        price: '',
        stock: '',
        imgUrl: [],
      },
      state: {
        title: '',
        description: '',
        price: '',
        stock: '',
      },
      previewUrl: {},
    }
  },
  mounted() {
    this.$store.dispatch('SetHeaderBack', {show:true,url:''});
  },
  methods: {
    notice(action) {
      switch (action) {
        case 'preview':
          this.previewUrl = this.$refs.uploader.getPreviewImgs()
          if (Object.keys(this.previewUrl).length === 0) {
            Toast('预览图片出错，系统异常，请稍后重试')
            return
          }
          break;
        case 'upload':
          this.form.imgUrl = this.$refs.uploader.getUploadImg()
          if (this.form.imgUrl.length === 0) {
            Toast('上传商品出错，系统异常，请稍后重试')
            return
          }
          this.handleAddItem()
          break
        case 'delete':
          this.previewUrl = this.$refs.uploader.getPreviewImgs()
          break
        default:
          break;
      }
    },
    deleteImg(index){
      this.$refs.uploader.deleteImg(index)
    },
    handleUpload() {
      this.$refs.uploader.handleUpload()
    },
    handleAddItem() {
      const dict = {
        title:"商品名称",
        description:"商品描述",
        price:"价格",
        stock:"库存",
        imgUrl:"商品图片",
      }
      for (const key in this.form) {
        const element = this.form[key];
        if (element.length <= 0) {
          Toast({
            message: '请先填写'+dict[key],
          })
          this.state[key] = "warning"
          return false
        }
      }
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      itemApi.add(this.form).then((res) => {
        if (res.status === "success") {
          Indicator.close();
          Toast({
            message: '添加成功'
          })
          window.location.href = `/#/item/detail?id=${res.data.id}`
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.item-add {
  .add-img {
    text-align: center;
    img {
      padding-top: 40px;
    }
  }
  .uploader {
    display: grid;
    grid-template-columns: repeat(auto-fit,31.8%);
    grid-gap: 2%;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 1px;
    border-top: 1px solid #eee;
    padding-top: 10px;
    .item {
      border: 1px solid #eeeeee;
      overflow: hidden;
      height: 120px;
      position: relative;
      .img {
        height: 120px;
        width: 100%;
      }
      .delete {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 22px;
        height: 22px;
        cursor: pointer;
        border-radius: 50%;
      }
    }
  }
  .add {
    width: 90%;
    margin: 10px auto;
    .button {
      width: 100%;
    }
  }
}
</style>