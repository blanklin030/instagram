<template>
  <div class="login">
    <v-header ref="vHeader" :title="'补充用户信息'" :back="'/account/code'"/>
    <div class="form">
      <mt-field 
        label="用户名" 
        placeholder="请输入用户名" 
        v-model="form.name" 
        :state="this.state.name"
      />
      <mt-field 
        label="邮箱" 
        placeholder="请输入邮箱" 
        type="email" 
        v-model="form.email"
        :state="this.state.email"
      />
      <mt-field 
        label="手机号" 
        readonly
        placeholder="请输入手机号" 
        type="tel" 
        v-model="form.telephone"
        :state="this.state.telephone"
      />
      <mt-field 
        label="密码" 
        placeholder="请输入密码" 
        type="encryptPassword" 
        v-model="form.encryptPassword"
        :state="this.state.encryptPassword"
      />
      <mt-field 
        label="性别" 
        placeholder="请选择性别" 
        readonly
        v-model="genderLabel"
        :state="this.state.gender"
      >
        <mt-radio
          v-model="form.gender"
          :options="[
          {label: '男',value: '1'},
          {label: '女',value: '2'}
          ]" 
          @change="handleRadio"
        />
      </mt-field>
      <mt-field 
        label="年龄" 
        placeholder="请选择年龄" 
        readonly
        v-model="form.age"
        :state="this.state.age"
      >
        <mt-picker :slots="slots" @change="handlePicker" />
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
        name: '',
        age: '18',
        gender: '',
        email: '',
        telephone: '',
        encryptPassword: '',
      },
      state: {
        name: '',
        age: '',
        gender: '',
        email: '',
        telephone: '',
        encryptPassword: '',
      },
      genderLabel:"",
      slots: [
        {
          flex: 1,
          values: ['18', '19', '20', '21', '22', '23', '199'],
          className: 'slot1',
        }
      ],
      
      count: 0,
      timer: null,
    }
  },
  mounted() {
    if(!this.$route.query.telephone) {
      window.location.href = "/#/account/code";
      return;
    }
    this.form.telephone = this.$route.query.telephone
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
        name:"用户名",
        encryptPassword:"密码",
        email:"邮箱",
        gender:"性别",
        telephone:"手机号",
        age:"年龄",
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
      userApi.register(this.form).then((res) => {
        if (res.status === "success") {
          Toast({
            message: '注册成功'
          })
          window.location.href = "/#/account/login"
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