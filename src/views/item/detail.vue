<template>
  <div class="item-detail">
    <div class="top">
      <div class="left">
        <div class="avatar">
          <img :src="userInfo.avatar" />
        </div>
        <div class="people">
          <div class="name">{{userInfo.name}}</div>
          <div class="time">2020-09-09</div>
        </div>
      </div>
      <div class="right">
        <div>453</div>
        <div>views</div>
      </div>
    </div>
    <div class="money">
      <span class="price item">
        ¥{{info.price}}元
        <div>价格：<img src="@/assets/images/mine/jg.png" /></div>
      </span>
      <span class="sales item">
        {{info.sales}}个
        <div>销量：<img src="@/assets/images/mine/xl.png" /></div>
      </span>
      <span class="stock item">
        {{info.stock}}个
        <div>库存：<img src="@/assets/images/mine/kc.png" /></div>
      </span>
    </div>
    <div class="title">
      <span class="tag">秒杀</span>
      <span class="word">{{info.title}}</span>
    </div>
    <div class="desc">
      {{info.description}}
    </div>
    <div class="image">
      <div class="item" v-for="(item,key) in info.imgUrl" :key="key">
        <img :src="item" />
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <div class="item zan">
          <div><img src="@/assets/images/mine/zan.png"/></div>
          <div>超赞</div>
        </div>
        <div class="item ly">
          <div><img src="@/assets/images/mine/ly.png"/></div>
          <div>留言</div>
        </div>
        <div class="item sc">
          <div><img src="@/assets/images/mine/sc.png"/></div>
          <div>收藏</div>
        </div>
      </div>
      <div class="right">
        <mt-button 
          v-if="owner"
          class="btn" 
          type="primary"
          size="small" 
          @click="handleEdit"
        >去编辑</mt-button>
        <mt-button 
          v-else
          class="btn" 
          type="danger"
          size="small" 
          @click="handleBuy"
        >我想要</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import orderApi from '@/api/order';
import itemApi from '@/api/item';
import userTool from '../../assets/utils/user';
import Vue from 'vue'
import { Cell, Toast, Indicator } from 'mint-ui';

Vue.component(Toast.name, Toast, Cell.name, Cell);
export default {
  name: 'item-detail',
  components: {
    
  },
  data() {
    return {
      item_id: 0,
      info: {},
      owner: false,
      userInfo: {},
    }
  },
  computed: {
  },
  mounted() {
    this.$store.dispatch('SetHeaderBack', {show:true,url:''});
    this.$store.dispatch('SetBottom', false)
    if (!this.$route.query.id) {
      window.history.back()
    }
    this.item_id = this.$route.query.id
    this.getDetail()
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.userInfo = userTool.getUserInfo();
      if (Object.keys(this.userInfo).length === 0) {
        userTool.saveStorage()
      }
    },
    getDetail() {
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      itemApi.getDetail(this.item_id).then((result) => {
        Indicator.close();
        if (result.status === 'success') {
          this.info = result.data.item
          this.owner = result.data.owner
          if (this.info.imgUrl) {
            this.info.imgUrl = JSON.parse(this.info.imgUrl)
          }
        }
      }).catch((err) => {
        Toast(err)
      });
    },
    handleEdit() {

    },
    handleBuy() {
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      orderApi.add(this.item_id, 1).then((result) => {
        Indicator.close();
        if (result.status === 'success') {
          Toast("购买成功，准备发货啦。。")
          this.getDetail()
        }
      }).catch((err) => {
        Toast(err)
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.item-detail {
  padding: 20px;
  overflow: hidden;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      justify-content: space-between;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #666;
        text-align: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid #ccc;
        }
      }
      .people {
        padding-left: 10px;
        .name {
          padding-bottom: 5px;
          padding-top: 5px;
        }
      }
    }
    .right {
      border: 1px solid #ccc;
      border-radius: 30px;
      padding: 0px 20px;
      text-align: center;
      font-size: 12px;
      height: 30px;
      font-weight: 400;
      color: #666666;
    }
  }
  .money {
    margin-top: 20px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 30%);
    grid-gap: 1rem;
    .item {
      text-align: center;
      width: 100%;
      img {
        width: 16px;
      }
    }
    .price {
      border-radius: 5px;
      background-color: #EC5D8A;
      color: white;
      padding: 5px;
      font-size: 12px;
    }
    .sales {
      border-radius: 5px;
      background-color: #4EA1F8;
      color: white;
      padding: 2px;
      font-size: 12px;
    }
    .stock {
      border-radius: 5px;
      background-color: #6CB33E;
      color: white;
      padding: 2px;
      font-size: 12px;
    }
  }
  .title {
    margin-bottom: 20px;
    .word {
      font-size: 14px;
      font-weight: bold;
    }
    .tag {
      background-color: red;
      border-radius: 5px;
      padding: 5px;
      color: white;
      margin-right: 5px;
      font-size: 10px;
    }
  }
  .desc {
    line-height: 20px;
    font-size: 1rem;
    margin-bottom: 20px;
    font-size: 12px;
  }
  .image {
    overflow: hidden;
    text-align: center;
    .item {
      img {
        width: 100%;
        height: 90%;
      }
    }
  }
  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    height: 55px;
    background-color: white;
    .left {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      
      img {
        width: 16px;
      }
      .item {
        padding-right: 20px;
        text-align: center;
      }
    }
  }
}
</style>
