<template>
  <div class='setting-container'>
    <el-card>
      <div slot="header"><my-breadcrumb>个人设置</my-breadcrumb></div>
      <el-row :gutter="6">
        <!-- <el-col :span="12" :xs="12" :sm="6" :md="6" :lg="4"> -->
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号">{{user.id}}</el-form-item>
            <el-form-item label="手机">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介">
              <el-input type="textarea" :rows="3" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="hSaveUser">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 action必须属性
          http-request 覆盖默认的上传行为，可以自定义上传的实现 function
          在修改用户头像这个功能中，后端的接口是patch方式，而el-upload默认
          只支持post方式上传，所以这里我们要启用el-upload的自定义上传属性：
          http-request，它会覆盖默认的上传方式
          -->
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="hSavePhoto"
            :show-file-list="false">
            <img v-if="user.photo" :src="user.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="edit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile, modUserProfile, modUserPhoto } from '@/api/user'
import MyBreadcrumb from '@/components/MyBreadcrumb'
export default {
  name: 'Settings',
  props: [],
  components: { MyBreadcrumb },
  data () {
    return {
      user: {
        name: '',
        intro: '',
        email: ''
      }
    }
  },
  methods: {
    // 获取用户资料
    async loadUserProfile () {
      try {
        const res = await getUserProfile()
        // console.log(res)
        this.user = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    // 修改用户资料
    async hSaveUser () {
      try {
        const { name, intro, email } = this.user
        await modUserProfile({ name, intro, email })
        // console.log(res)
        this.$message.success('修改成功')
        // 发布同步用户名事件
        this.$eventBus.$emit('updateUserName', name)
      } catch (err) {
        console.log(err)
        this.$message.error('修改失败')
      }
    },
    // 更新用户头像 这个事件会自动传入一个对象，用来表示当前要上传的信息
    async hSavePhoto (obj) {
      // console.log(obj)
      try {
        const formData = new FormData()
        formData.append('photo', obj.file)
        const res = await modUserPhoto(formData)
        this.$message.success('修改用户头像成功')
        this.user.photo = res.data.data.photo
        // 发布同步用户头像事件
        this.$eventBus.$emit('updateUserPhoto', this.user.photo)
      } catch (err) {
        console.log(err)
        this.$message.error('更新头像失败')
      }
    }
  },
  computed: { },
  created () {
    this.loadUserProfile()
  },
  mounted () { }
}
</script>

<style scoped lang='less'>
.edit-photo{
  font-size: 12px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  line-height: 178px;
}
.avatar-uploader {
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
// 覆盖或者修改第三方组件自带的样式：方法二
.image-container /deep/ .el-card__body {
  padding: 30px;
}
// /deep/：称为它具有穿透功能：把选择器的能力从父组件中穿透到子组件中
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
</style>
