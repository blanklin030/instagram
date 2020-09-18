<template>
  <div class="login">
    <div class="form">

      <div class="avatar">
        <img :class="isPreview ?'preview' : 'avatar-img'" :src="form.avatar" />
        <uploader ref="uploader" @notice="notice"/>
        <div class="plus">
          <span class="plus-img">+</span>
        </div>
      </div>

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
      
      <mt-button 
        class="button" 
        type="primary" 
        @click="handleUpload"
      >更新</mt-button>

    </div>
  </div>
</template>
<script>
import uploader from '@/components/uploader';
import localAvatar from '@/assets/images/mine/avatar.png';
import userApi from '@/api/user'
import userTool from '../../assets/utils/user';
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
  components: { uploader },
  data() {
    return {
      form: {
        name: '',
        age: '18',
        gender: '',
        email: '',
        telephone: '',
        avatar: localAvatar,
      },
      state: {
        name: '',
        age: '',
        gender: '',
        email: '',
        telephone: '',
        avatar: '',
      },
      genderLabel:"",
      slots: [
        {
          flex: 1,
          values: ['18', '19', '20', '21', '22', '23', '199'],
          className: 'slot1',
        }
      ],
      isPreview: false,
      isUpload: false,
      count: 0,
      timer: null,
    }
  },
  mounted() {
    this.$store.dispatch('SetBottom', true)
    this.$store.dispatch('SetHeaderBack', {show:true, url:'/#/mine'});
    this.getUserInfo()
  },
  methods: {
    notice(action) {
      let avatar = this.$refs.uploader.getPreviewImgs()
      switch (action) {
        case 'preview':
          if (Object.keys(avatar).length !== 1) {
            Toast('预览头像出错，系统异常，请稍后重试')
          }
          this.form.avatar = avatar[Object.keys(avatar)[0]]
          this.isPreview = true
          this.isUpload = true
          break;
        case 'upload':
          avatar = this.$refs.uploader.getUploadImg()
          if (Object.keys(avatar).length !== 1) {
            Toast('上传头像出错，系统异常，请稍后重试')
          }
          this.form.avatar = avatar[Object.keys(avatar)[0]]
          this.isPreview = true
          this.handleEdit()
          break
        default:
          break;
      }
    },
    handleRadio(value) {
      this.genderLabel = {1:"男",2:"女"}[value];
    },
    handlePicker(picker) {
      this.form.age = picker.getSlotValue(0);
    },
    handleUpload() {
      if (this.isUpload) {
        this.$refs.uploader.handleUpload()  
      } else {
        this.handleEdit()
      }
    },
    handleEdit() {
      const dict = {
        name:"用户名",
        email:"邮箱",
        gender:"性别",
        telephone:"手机号",
        age:"年龄",
        avatar: '头像'
      }
      for (const key in this.form) {
        const element = this.form[key];
        if (element.length <= 0) {
          Toast({
            message: '请先补充'+dict[key] + '信息！',
          })
          this.state[key] = "warning"
          return false
        }
      }
      userApi.edit(this.form).then((res) => {
        if (res.status === "success") {
          Toast({message: '修改成功'})
          userTool.saveStorage()
          window.location.href = "/#/mine"
        }
      })
    },
    getUserInfo() {
      userApi.getInfo().then((res) => {
        if (res.status === "success") {
          this.isPreview = res.data.avatar.length != 0 ? true: false
          this.form = {...res.data}
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.login {
  .form {
    margin-top: 50px;
    .avatar {
      position: relative;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      border: 2px solid #933E92;
      background-color: #666;
      text-align: center;
      margin: 10px auto;
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
      .plus {
        position: absolute;
        top: 50px;
        left: 55px;
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
    .button {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>