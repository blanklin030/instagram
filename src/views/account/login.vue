<template>
  <div class="login">
    <v-header ref="vHeader" :title="'登陆账号'" :back="'/account/code'"/>
    <div class="form">
      <mt-field 
        label="手机号" 
        placeholder="请输入手机号" 
        v-model="form.telephone" 
        :state="this.state.telephone"
      />
   
      <mt-field 
        label="密码" 
        placeholder="请输入密码" 
        type="password" 
        v-model="form.password"
        :state="this.state.password"
      />
      <mt-button class="button" type="primary" @click="handleLogin">登陆</mt-button>
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
        password: '',
      },
      state: {
        telephone: '',
      },
      genderLabel:"",
      slots: [
        {
          flex: 1,
          values: ['18', '19', '20', '21', '22', '23'],
          className: 'slot1',
        }
      ],
      
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
    handleLogin() {
      const dict = {
        password:"密码",
        telephone:"手机号",
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
      userApi.login(this.form.telephone, this.form.password).then((res) => {
        if (res.status === "success") {
          Toast({
            message: '登陆成功'
          })
          window.location.href = "/#/index"
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