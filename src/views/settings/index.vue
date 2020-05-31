<template>
  <div class='setting-container'>
    <el-card>
      <div slot="header"><my-breadcrumb>个人设置</my-breadcrumb></div>
      <el-row :gutter="6">
        <!-- <el-col :span="12" :xs="12" :sm="6" :md="6" :lg="4"> -->
        <el-col :span="12">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介">
              <el-input type="textarea" v-model="user.intro"></el-input>
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
          <el-row>
            <el-col :push="10">
              <my-cover @input="hSavePhoto" v-model="user.photo"></my-cover>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px">
            <el-col style="text-align:center">
              修改头像
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile, modUserProfile, modUserPhoto } from '@/api/user'
import MyBreadcrumb from '@/components/MyBreadcrumb'
import MyCover from '@/components/MyCover'
export default {
  name: 'Settings',
  props: [],
  components: { MyBreadcrumb, MyCover },
  data () {
    return {
      user: {
        id: 0,
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
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
        const res = await modUserProfile(this.user)
        console.log(res)
        this.$message.success('修改成功')
      } catch (err) {
        console.log(err)
        this.$message.error('修改失败')
      }
    },
    // 更新用户头像
    async hSavePhoto () {
      console.log('hSavePhoto')
      try {
        const res = await modUserPhoto(this.user.photo)
        console.log(res)
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

<style scoped lang='less'></style>
