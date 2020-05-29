<template>
  <div class=''>
    <el-card>
      <div slot="header"><my-breadcrumb>发布文章</my-breadcrumb></div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover">
            <!-- 1:自动，0-无图，1-1张，3-3张 -->
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option label="频道一" value="shanghai"></el-option>
            <el-option label="频道二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布文章</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
export default {
  name: 'AddArticle',
  props: { },
  components: { MyBreadcrumb },
  data () {
    return {
      article: {
        title: '',
        channel_id: '',
        content: '',
        cover: 0
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
