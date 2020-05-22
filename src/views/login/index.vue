<template>
  <div class='login-container'>
    <div class="login-form-wrap">
      <!-- logo部分 -->
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!-- 表单部分 -->
      <el-form class="login-form" :model="user" ref="form" :rules='rules'>
        <el-form-item prop='mobile'>
          <!-- 手机号 -->
          <el-input v-model.trim="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <!-- 验证号 -->
          <el-input v-model.trim="user.code" placeholder="请输入验证号"></el-input>
        </el-form-item>

        <el-form-item prop='agree'>
          <el-checkbox v-model="user.agree" >我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <!-- 按钮上有一个loading属性 -->
          <el-button :loading="loginLoading" @click="onSubmit" class="login-btn" type="primary">登陆</el-button>
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
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号格式不对', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '验证码格式不对', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) callback()
              else callback(new Error('请同意用户协议'))
            }
          }
        ]
      },
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: true
      },
      loginLoading: false // 登陆按钮上的loading。 如果它为true，则会转圈圈
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(valid => {
        console.log('检验结果', valid)
        if (valid) this.hLogin()
      })
    },
    hLogin () {
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
