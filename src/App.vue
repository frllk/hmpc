<template>
  <div id="app">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button @click='hTest' type="primary">测试axios</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
     <h1>黑马头条内容发布系统</h1>
    <router-view/>
  </div>
</template>
<script>
import ajax from './utils/request'
export default {
  name: 'App',
  methods: {
    hTest () {
      ajax({
        method: 'get',
        url: '/app'
      })
    }
  }
}
</script>
<style lang="less">

</style>
