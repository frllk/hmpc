<template>
  <div class='articles-container'>
    <!-- 表单筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-breadcrumb>评论管理</my-breadcrumb>
      </div>
      <el-table
        v-loading="loading"
        :data="comments"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="文章标题">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          label="评论状态">
          <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.comment_status">关闭</el-tag>
            <el-tag v-else type="success">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
             <el-button v-if="scope.row.comment_status" type="success" size="mini" @click="hToggleComment(scope.row)">打开评论</el-button>
            <el-button v-else type="danger" size="mini" @click="hToggleComment(scope.row)">关闭评论</el-button>
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
import { getComments, modComment } from '../../api/comment'
import MyBreadcrumb from '../../components/MyBreadcrumb'
export default {
  name: 'Comment',
  props: { },
  data () {
    return {
      comments: [], // 文章
      total_count: 0,
      page: 1,
      per_page: 10,
      loading: false
    }
  },
  components: { MyBreadcrumb },
  methods: {
    // 加载评论
    async  loadComments () {
      try {
        // 开启加载状态
        this.loading = true

        const res = await getComments(this.page, this.per_page)
        this.comments = res.data.data.results
        this.total_count = res.data.data.total_count
        // 关闭加载状态
        this.loading = false
      } catch (err) {
        console.log(err)
        this.$message.error('获取评论列表失败')
        // 关闭加载状态
        this.loading = false
      }
    },
    // 分页
    hPageChange (currPage) {
      this.page = currPage
      this.loadComments()
    },
    // 切换状态  打开/关闭 评论状态
    async hToggleComment (comment) {
      try {
        await modComment(comment.id.toString(), !comment.comment_status)
        this.$message.success('操作成功')
        // 更新数据
        comment.comment_status = !comment.comment_status
      } catch (err) {
        this.$message.error('操作失败')
      }
    }
  },
  computed: { },
  created () {
    this.loadComments()
  },
  mounted () { }
}
</script>

<style scoped lang='less'></style>
