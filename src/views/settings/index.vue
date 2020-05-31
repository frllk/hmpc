<template>
  <div class='setting-container'>
    <el-card>
      <div slot="header"><my-breadcrumb>个人设置</my-breadcrumb></div>
      <el-row :gutter="6">
        <!-- <el-col :span="12" :xs="12" :sm="6" :md="6" :lg="4"> -->
        <el-col :span="12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">
              1
            </el-form-item>
            <el-form-item label="手机">
              15512544555
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :push="10">
              <my-cover v-model="imgSrc"></my-cover>
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
import MyBreadcrumb from '@/components/MyBreadcrumb'
import MyCover from '@/components/MyCover'
export default {
  name: 'Settings',
  props: [],
  components: { MyBreadcrumb, MyCover },
  data () {
    return {
      form: {
        imgSrc: '',
        name: '',
        region: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    }
  },
  computed: { },
  created () { },
  mounted () { }
}
</script>

<style scoped lang='less'></style>
