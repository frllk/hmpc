<template>
<!-- 分页 -->
<el-pagination
  style="margin-top: 10px;"
  background
  layout="prev, pager, next"
  prev-text="上一页"
  next-text="下一页"
  @current-change="hPageChange"
  :disabled="loading"
  :page-size="per_page"
  :hide-on-single-page="true"
  :total="total_count">
</el-pagination>
<!-- 分页 -->
</template>

<script>
export default {
  name: 'MyPagination',
  props: ['loading', 'total_count', 'per_page'],
  data () {
    return {
      // per_page: 10
    }
  },
  methods: {
    hPageChange (currPage) {
      // console.log('current-change事件，当前页码', currPage)
      // this.$emit('事件名',参数)
      this.$emit('current-change', currPage)
    }
  },
  computed: { },
  created () { },
  mounted () { }
}
</script>

<style scoped lang='less'></style>
