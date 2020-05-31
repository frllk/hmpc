<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
       <my-breadcrumb>粉丝管理 </my-breadcrumb>
      </div>

      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card">

        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item">
              <el-avatar :size="80" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              <p>item.name</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>

          <!-- 分页 -->

          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="per_page"
            @current-change="changePage"
            :total="total">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="粉丝画像" name="img">
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'

export default {
  name: 'MyFans',
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      // tabs的当前激活选项卡的name属性值
      activeName: 'list',
      per_page: 20,
      page: 1,
      list: [],
      total: 0,
      // 测试头像
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    changePage () {

    }
  }
}
</script>

<style scoped lang='less'>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>
