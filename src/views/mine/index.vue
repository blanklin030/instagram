<template>
  <div class="mine">
    <div class="top">
      <div class="me">
        <img class="avatar" src="@/assets/images/mine/avatar.png" />
        <img class="plus" src="@/assets/images/mine/plus.png" />
        <div class="name">blanklin</div>
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
      <div class="item"><img src="@/assets/images/index/gw.png" /></div>
      <div class="item"><img src="@/assets/images/index/jl.png" /></div>
      <div class="item"><img src="@/assets/images/index/td.png" /></div>
      <div class="item"><img src="@/assets/images/index/wt.png" /></div>
      <div class="item"><img src="@/assets/images/index/zl.png" /></div>
      <div class="item">
        <div class="add" @click="handleAdd">
          <img class="add-button" src="@/assets/images/mine/add.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: 'mine',
  components: {
    
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleEdit() {

    },
    handleAdd() {
      window.location.href = '/#/item/add'
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
        border: 1px solid #eeeeee;
      }
      .plus {
        position: absolute;
        top: 50px;
        left: 70px;
        // border: 1px solid #ccc;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        // padding: 0px;
      }
      .name {
        text-align: center;
        font-weight: 400;
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
    grid-template-columns: repeat(auto-fit,33%);
    grid-gap: 0.1rem;
    margin-top: 10px;
    padding-left: 1px;
    .item {
      border: 1px solid #eeeeee;
      overflow: hidden;
      height: 120px;
      img:not(.add-button) {
        height: 120px;
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
