<template>
  <div class="login">
    <v-header ref="vHeader" :title="'登陆账号'" :back="'/account/code'"/>
    <div class="form">
      <mt-field 
        label="用户名" 
        placeholder="请输入用户名" 
        v-model="form.name" 
        :state="this.state.name"
      />
   
      <mt-field 
        label="密码" 
        placeholder="请输入密码" 
        type="password" 
        v-model="form.password"
        :state="this.state.password"
      />
    </div>
    <div class="btn-div">
      <mt-button 
        class="btn" 
        type="primary" 
        @click="handleLogin"
      >登陆</mt-button>
    </div>
  </div>
</template>
<script>
import userUtil from '@/assets/utils/user';
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
        name: '',
        password: '',
      },
      state: {
        name: '',
        password: '',
      },
      genderLabel:"",
      slots: [
        {
          flex: 1,
          values: ['18', '19', '20', '21', '22', '23'],
          className: 'slot1',
        }
      ],
      redirect: null,
      count: 0,
      timer: null,
    }
  },
  mounted() {
    this.$store.dispatch('SetHeaderBack', {show:true,url:'/#/account/register'});
    this.redirect = this.$route.query.redirect;
  },
  methods: {
    handleLogin() {
      const dict = {
        password:"密码",
        name:"用户名",
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
      userApi.login(this.form.name, this.form.password).then((res) => {
        if (res.status === "success") {
          Toast({
            message: '登陆成功'
          })
          userUtil.setToken(res.data);
          userUtil.saveStorage();
          if (this.redirect) {
            window.location.href = this.redirect
          }
          window.location.href = "/#/index"
        }
      })
    },
    handleCode() {
      if (this.form.name.length <= 0) {
        Toast({
          message: '请先填写手机号',
        })
        this.state.name = "warning"
        return false
      }
      userApi.getCode(this.form.name).then((res) => {
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
  }
  .btn-div {
    width: 90%;
    margin: 20px auto;
    .btn {
      width: 100%;
    }
  }
}
</style>