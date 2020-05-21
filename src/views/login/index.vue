<template>
  <div class='login-container'>
    <div class="login-form-wrap">
      <!-- logo部分 -->
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!-- 表单部分 -->
      <el-form class="login-form" ref="form">
        <el-form-item>
          <!-- 手机号 -->
          <el-input v-model.trim="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 验证号 -->
          <el-input v-model.trim="user.code" placeholder="请输入验证号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="checked" >我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <!-- 按钮上有一个loading属性 -->
          <el-button :loading="loginLoading" @click="hLogin" class="login-btn" type="primary">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ajax from '../../utils/request'
export default {
  name: 'MyComponent',
  props: { },
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      checked: false,
      loginLoading: false // 登陆按钮上的loading。 如果它为true，则会转圈圈
    }
  },
  methods: {
    hLogin () {
      if (this.user.mobile === '') return
      if (this.user.code === '') return
      if (this.checked === false) return
      this.loginLoading = true
      ajax({
        method: 'post',
        url: '/mp/v1_0/authorizations',
        data: { mobile: this.user.mobile, code: this.user.code }
      }).then(res => {
        console.log(res.data)
        // 成功提示消息
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false
      }).catch(err => {
        console.log(err)
        // 错误提示消息
        this.$message.error('登录失败')
        // 关闭 loading
        this.loginLoading = false
      })
    }
  },
  computed: { },
  created () { },
  mounted () { }
}
</script>

<style scoped lang="less">
// 铺满整屏
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
