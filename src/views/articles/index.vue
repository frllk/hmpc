<template>
  <div class='articles-container'>
    <!-- 表单筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <!-- 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
          <el-radio-group v-model="form.status">
            <el-radio label="">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.channel_id" placeholder="请选择频道">
            <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
            <!-- <el-option label="频道二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="hQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 主体区域 -->
    <el-card class="box-card" style="margin-top: 10px">
      <div slot="header" class="clearfix">
        <!-- <i style="color:#F56C6C">1<i> -->
        根据筛选条件查询到<i style="color: #F56C6C">{{total_count}}</i> 条数据，当前是第 <i style="color: #F56C6C">{{currPage}}</i> 页
      </div>
      <el-table
        :data="articles"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-image
              lazy
              style="width: 150px; height: 100px"
              :src="scope.row.cover.images[0]">
              </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="info">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
             <el-button
              type="primary" icon="el-icon-edit" circle
              size="mini"
              @click="hEdit(scope.$index, scope.row)"></el-button>
            <el-button
              type="danger" icon="el-icon-delete" circle
              size="mini"
              @click="hDelete(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        background
        layout="prev, pager, next"
        @current-change="hPageChange"
        :hide-on-single-page="true"
        prev-text="上一页"
        next-text="下一页"
        :total="total_count">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, delArticle, getChannels } from '../../api/artilce'
export default {
  name: 'ArticleIndex',
  props: { },
  data () {
    return {
      form: {
        channel_id: '',
        date: '',
        status: ''
      },
      articles: [], // 文章
      channels: [],
      total_count: 0,
      currPage: 1
    }
  },
  methods: {
    hQuery () {
      this.loadArticles()
    },
    loadArticles () {
      const query = { page: this.currPage }
      if (this.form.status !== '') {
        query.status = this.form.status
      }
      if (this.form.channel_id > 0) {
        query.channel_id = this.form.channel_id
      }
      getArticles(query).then(res => {
        // console.log('获取文章列表：', res.data)
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
      }).catch(err => console.log(err))
    },
    loadChannels () {
      getChannels().then(res => {
        console.log(res.data.data.channels)
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err)
      })
    },
    hPageChange (currPage) {
      // console.log(currPage)
      this.currPage = currPage
      this.loadArticles()
    },
    hEdit (index, row) {
      console.log(index, row)
    },
    hDelete (id) {
      this.$confirm('确定要删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        delArticle(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadArticles()
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  computed: { },
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  mounted () { }
}
</script>

<style scoped lang='less'></style>
