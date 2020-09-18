<template>
  <div class="index">
    <div class="top">
      <div class="item add">
        <img class="avatar" src="@/assets/images/mine/avatar.png" />
        <div class="name">blanklin</div>
        <div class="plus">
          <span class="plus-img">+</span>
        </div>
      </div>
      <div v-for="(item,key) in user" :key="key" class="item">
        <img class="avatar" :src="item.avatar" />
        <div class="name">{{item.name}}</div>
      </div>
    </div>
    <div class="line" />
    <div class="list">
      <div 
        v-for="(item,key) in list" 
        :key="key" 
        class="item"
        @click="handleDetail(item.item.id)"
      >
        <div class="top">
          <div class="left">
            <div class="avatar"><img :src="item.user.avatar" /></div>
            <div class="name">{{item.user.name}}</div>
          </div>
          <div class="right">
            <span class="mint-button-icon"><i class="mintui mintui-more"/></span>
          </div>
        </div>
        <div class="middle">
          <mt-swipe class="swipe" :auto="4000">
            <mt-swipe-item v-for="(url,index) in parseToJson(item.item.imgUrl)" :key="index">
              <img :src="url" />
            </mt-swipe-item>
          </mt-swipe>
          <div class="money">
            <div class="item price">
              <span>{{item.item.price}}元</span>
              <img src="@/assets/images/mine/jg.png" />
            </div>
            <div class="item stock">
              <span>{{item.item.stock}}个</span>
              <img src="@/assets/images/mine/kc.png" />
            </div>
            <div class="item sale">
              <span>{{item.item.sales}}个</span>
              <img src="@/assets/images/mine/xl.png" />
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <img src="@/assets/images/index/xh.png"/>
            <img src="@/assets/images/index/ly.png"/>
            <img src="@/assets/images/index/zf.png"/>
          </div>
          <div class="right">
            <img src="@/assets/images/index/sc.png"/>
          </div>
        </div>
        <div class="line" />
      </div>
    </div>
    
  </div>
</template>

<script>
import userApi from '@/api/user'
import itemApi from '@/api/item'
import Vue from 'vue'
import { Swipe, SwipeItem, Indicator } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: 'index',
  components: {
    
  },
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 10,
      user: [],
    }
  },
  mounted() {
    this.$store.dispatch('SetBottom', true)
    this.$store.dispatch('SetHeaderBack', {show:false,url:''});
    this.getList()
    this.getUserList()
  },
  methods: {
    getList() {
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      itemApi.getIndexList(this.page, this.size).then((res) => {
        Indicator.close();
        if (res.status === "success") {
          this.list = res.data
        }
      })
    },
    getUserList() {
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'})
      userApi.getList(this.page, this.size).then((res) => {
        Indicator.close();
        if (res.status === "success") {
          this.user = res.data
        }
      })
    },
    parseToJson(str) {
      return JSON.parse(str)
    },
    handleDetail(itemId){
      window.location.href = '/#/item/detail?id=' + itemId
    }
  },
}
</script>

<style lang="scss" scoped>
.index {
  margin-bottom: 10px;
  .top {
    display: grid;
    grid-template-columns: repeat(auto-fit, 23%);
    grid-gap: 0.5rem;
    padding-left: 10px;
    .item {
      border: 2px solid #933E92;
      border-radius: 50%;
      height: 70px;
      width: 70px;
      background-color: black;
      text-align: center;
      .name {
        font-size: 12px;
        padding-top: 5px;
      }
      .avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
    }
    .add {
      position: relative;
      .plus {
        position: absolute;
        right: -10px;
        bottom: 1px;
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
    }
  }
  .line {
    height: 1px;
    margin-top: 35px;
    background-color: #eee;
  }
  .list {
    padding-top: 20px;
    .item {
      margin-bottom: 10px;
      .top {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          .avatar {
            border: 2px solid #933E92;
            border-radius: 50%;
            height: 45px;
            width: 45px;
            background-color: #666;
            text-align: center;
            img {
              width: 42px;
              height: 42px;
              border-radius: 50%;
            }
          }
          .name {
            line-height: 40px;
            padding-left: 10px;
          }
        }
        .right {
          padding-right: 10px;
        }
      }
      .middle {
        position: relative;
        .money {
          position: absolute;
          top: 20px;
          right: 10px;
          font-size: 12px;
          .item {
            border-radius: 5px;
            padding: 5px;
            height: 30px;
            // border: 1px solid #cccccc;
            text-align: center;
            color: white;
            img {
              width: 12px;
              margin-left: 5px;
            }
          }
          .price {
            background-color: #EC5D8A;
          }
          .stock {
            background-color: #6CB33E;
          }
          .sale {
            background-color: #4EA1F8;
          }
        }
      }
      .swipe {
        height: 10rem;
        margin-top: 10px;
        width: 100%;
        .mint-swipe-item {
          img {
            width: 100%;
          }
        }
      }
      .bottom {
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          justify-content: space-around;
        }
        img {
          width: 20px;
          height: 20px;
          margin-left: 20px;
        }
        .right {
          margin-right: 20px;
        }
      }
    }
  }
  
}
</style>
