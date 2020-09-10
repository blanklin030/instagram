<template>
  <div class="login">
    <v-header ref="vHeader" :title="'注册账号'" :back="'/index'"/>
    <div class="form">
      <mt-field 
        label="手机号" 
        placeholder="请输入手机号" 
        type="tel" 
        v-model="form.telephone"
        :state="this.state.telephone"
      />
      
      <mt-field 
        label="验证码" 
        v-model="form.captcha" 
        :state="this.state.captcha"
      >
        <mt-button v-if="count==0" size="small" type="primary" @click="handleCode">获取验证码</mt-button>
        <span v-else>{{count}}</span>
      </mt-field>
      <mt-button class="button" type="primary" @click="handleRegister">注册</mt-button>
    </div>
  </div>
</template>
<script>
import userApi from '../../api/user'
import vHeader from '@/layout/Header'
import Vue from 'vue'
import { Field } from 'mint-ui'
import { Button } from 'mint-ui'
import { Toast } from 'mint-ui'
import { Radio } from 'mint-ui';
import { Picker } from 'mint-ui';

Vue.component(Picker.name, Picker);
Vue.component(Radio.name, Radio);
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Toast.name, Toast)

export default {
  components: {vHeader},
  data() {
    return {
      form: {
        telephone: '',
        captcha: '',
      },
      state: {
        telephone: '',
        captcha: '',
      },
      genderLabel:"",
      count: 0,
      timer: null,
    }
  },
  methods: {
    handleRadio(value) {
      this.genderLabel = {1:"男",2:"女"}[value];
    },
    handlePicker(picker, values) {
      console.log(picker, values)
      this.form.age = picker.getSlotValue(0);
    },
    handleRegister() {
      const dict = {
        telephone:"手机号",
        captcha:"验证码",
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
      userApi.checkCode(this.form.captcha, this.form.telephone).then((res) => {
        if (res.status === "success") {
          Toast({
            message: '验证码校验成功,请补充用户信息'
          })
          window.location.href = "/#/account/register?telephone="+this.form.telephone
        }
      })
    },
    handleCode() {
      if (this.form.telephone.length <= 0) {
        Toast({
          message: '请先填写手机号',
        })
        this.state.telephone = "warning"
        return false
      }
      userApi.getCode(this.form.telephone).then((res) => {
        if (res.status === "success") {
          Toast({
            message: '验证码已发送至手机，请注意查收',
            iconClass: 'icon icon-success'
          })
          this.countDown(60)
        }
      })
    },
    countDown(total) {
      if (this.timer) {
        return false;
      }
      this.count = total;
      this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= total) {
          this.count -= 1;
        } else {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
      return true;
    },
  },
}
</script>
<style lang="scss" scoped>
.login {
  .form {
    margin-top: 80px;
    .button {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>