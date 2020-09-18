<template>
  <div class="mine">
    <div class="top">
      <div class="me">
        <div class="avatar">
          <img :class="isPreview ? 'preview' : 'avatar-img'" :src="avatar" />
          <uploader ref="uploader" @notice="notice"/>
        </div>
        <div class="plus">
          <span class="plus-img">+</span>
        </div>
        <div class="name">{{this.user.name}}</div>
      </div>
      <div class="right">
        <div class="item">
          <div>377</div>
          <div>Posts</div>
        </div>
        <div class="item">
          <div>54</div>
          <div>Following</div>
        </div>
        <div class="item">
          <div>6</div>
          <div>Followers</div>
        </div>
      </div>
    </div>
    <div class="desc">
      <img class="left" src="@/assets/images/mine/yh-left.png" />
      <span>keep calm && carry on</span>
      <img class="right" src="@/assets/images/mine/yh-right.png" />
    </div>
    <div class="button">
      <mt-button size="small" @click="handleEdit">Edit Profile</mt-button>
    </div>
    <!-- <div class="line" /> -->
    <div class="content">
      <div 
        v-for="(item, key) in list" 
        :key="key" 
        class="item"
        @click="handleDetail(item.id)"
      >
        <img :src="parseToJson(item.imgUrl)" />
      </div>
      <div class="item">
        <div class="add" @click="handleAdd">
          <img class="add-button" src="@/assets/images/mine/add.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uploader from '@/components/uploader'
import itemApi from '@/api/item'
import userApi from '@/api/user'
import Vue from 'vue'
import { Swipe, SwipeItem, Indicator, Toast } from 'mint-ui'
import localAvatar from '@/assets/images/mine/avatar.png'

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Toast.name, Toast)
export default {
  name: 'mine',
  components: {
    uploader
  },
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 10,
      avatar: localAvatar,
      isPreview: false,
      user: {}
    }
  },
  mounted() {
    this.$store.dispatch('SetBottom', true)
    this.getList()
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      userApi.getInfo().then((res) => {
        if (res.status === "success") {
          this.isPreview = true
          this.avatar = res.data.avatar
          this.user = {...res.data}
        }
      })
    },
    handleEdit() {
      window.location.href = '/#/mine/detail'
    },
    getList() {
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      itemApi.getList(this.page, this.size).then((res) => {
        Indicator.close();
        if (res.status === "success") {
          this.list = res.data
        }
      })
    },
    handleAdd() {
      window.location.href = '/#/item/add'
    },
    parseToJson(str) {
      return JSON.parse(str)[0]
    },
    handleDetail(itemId){
      window.location.href = '/#/item/detail?id=' + itemId
    },
    notice(action) {
      switch (action) {
        case 'preview':
          if (this.$refs.uploader.getPreviewImgs().length !== 1) {
            Toast('上传头像出错，系统异常，请稍后重试')
            return
          }
          this.avatar = this.$refs.uploader.getPreviewImgs()[0]
          this.isPreview = true
          break;
      
        default:
          break;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.mine {
  .top {
    display: flex;
    justify-content: space-between;
    .me {
      position: relative;
      padding-left: 5%;
      cursor: pointer;
      .avatar {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        border: 2px solid #933E92;
        background-color: #666;
        text-align: center;
        .avatar-img {
          width: 64px;
          height: 64px;
          padding-top: 5px;
        }
        .preview {
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }
      }
      .plus {
        position: absolute;
        top: 50px;
        left: 75px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #5197E3;
        text-align: center;
        border: 2px solid white;
        .plus-img {
          margin-top: 2px;
          font-size: 2opx;
          font-weight: bolder;
          color: white;
        }
      }
      .name {
        text-align: center;
        font-weight: 400;
        padding-top: 10px;
      }
    }
    .right {
      display: grid;
      grid-template-columns: repeat(auto-fit,33%);
      width: 70%;
      line-height: 20px;
      margin-top: 20px;
      font-weight: 400;
      text-align: center;
    }
  }
  .desc {
    text-align: left;
    line-height: 50px;
    padding-left: 33px;
    font-weight: 400;
    color: #8a8a8a;
    img {
      width: 16px;
      margin: 5px;
    }
  }
  .button {
    width: 90%;
    margin: 2px auto;
    .mint-button--small{
      width: 100%;
    }
  }
  .line {
    height: 1px;
    background: #eeeeee;
  }
  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit,32.9%);
    grid-gap: 0.1rem;
    margin-top: 10px;
    padding-left: 1px;
    .item {
      border: 1px solid #eeeeee;
      overflow: hidden;
      height: 120px;
      img:not(.add-button) {
        height: 120px;
        width: 100%;
      }
      .add {
        width: 100%;
        margin: 40px auto;
        text-align: center;
        cursor: pointer;
      }
    }
    
  }
}
</style>
