<template>
  <div class='articles-container'>
    <!-- 表单筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        <my-breadcrumb>内容管理</my-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <!-- 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <my-channels v-model="form.channel_id" :isClearable="true"></my-channels>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="hQuery">查询</el-button>
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
        v-loading="loading"
        :data="articles"
        style="width: 100%">
        <el-table-column
          label="ID">
          <template slot-scope="scope">{{scope.row.id.toString()}}</template>
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
              @click="hEdit(scope.row)"></el-button>
            <el-button
              type="danger" icon="el-icon-delete" circle
              size="mini"
              @click="hDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        background
        layout="prev, pager, next"
        @current-change="hPageChange"
        :disabled="loading"
        :hide-on-single-page="true"
        prev-text="上一页"
        next-text="下一页"
        :total="total_count">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import MyChannels from '@/components/MyChannelsVmodel'
import { getArticles, delArticle } from '../../api/article'
import MyBreadcrumb from '../../components/MyBreadcrumb'
export default {
  name: 'ArticleIndex',
  props: { },
  data () {
    return {
      form: {
        channel_id: null,
        date: null,
        status: null
      },
      articles: [], // 文章
      channels: [],
      total_count: 0,
      currPage: 1,
      loading: false
    }
  },
  components: { MyBreadcrumb, MyChannels },
  methods: {
    hQuery () {
      this.loadArticles()
    },
    async  loadArticles () {
      try {
        const query = { page: this.currPage }
        // && 找假 第一个假或者最后一个真
        // || 找真 第一个真或者最后一个假
        query.status = this.form.status
        query.channel_id = this.form.channel_id || null
        query.begin_pubdate = this.form.date && this.form.date[0]
        query.end_pubdate = this.form.date && this.form.date[1]

        // 开启加载状态
        this.loading = true

        const res = await getArticles(query)
        // console.log('获取文章列表：', res.data)
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
        // 关闭加载状态
        this.loading = false
      } catch (err) {
        console.log(err)
        this.$message.error('获取文章失败')
        // 关闭加载状态
        this.loading = false
      }
      // getArticles(query).then(res => {
      //   // console.log('获取文章列表：', res.data)
      //   this.articles = res.data.data.results
      //   this.total_count = res.data.data.total_count
      // }).catch(err => console.log(err))
    },
    hPageChange (currPage) {
      // console.log(currPage)
      this.currPage = currPage
      this.loadArticles()
    },
    hEdit (row) {
      console.log(row)
      const id = row.id.toString()
      // this.$router.push('/editArticle/' + id)
      this.$router.push({ path: '/editArticle/' + id, query: { isDraft: row.status === 0 } })
    },
    async hDelete (row) {
      try {
        await this.$confirm('确定要删除这条记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        try {
          const id = row.id.toString()
          console.log(id)
          await delArticle(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadArticles()
        } catch (e) {
          console.log(e)
          this.$message.error('删除失败!')
        }
      } catch (err) {
        this.$message.info('已取消删除')
      }
      // const id = row.id.toString()
      // console.log(id)
      // this.$confirm('确定要删除这条记录吗?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   delArticle(id).then(res => {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     })
      //     this.loadArticles()
      //   }).catch(err => {
      //     console.log(err)
      //     this.$message({
      //       type: 'error',
      //       message: '删除失败!'
      //     })
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    }
  },
  computed: { },
  created () {
    this.loadArticles()
  },
  mounted () { }
}
</script>

<style scoped lang='less'></style>
