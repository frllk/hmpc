<template>
  <div class='publish-container'>
    <el-card>
      <div slot="header"><my-breadcrumb>发布文章</my-breadcrumb></div>
      <el-form ref="form" :rules="rules" :model="article" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <quill-editor v-model="article.content"  :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type" @change="article.cover.images = []">
            <!-- 1:自动，0-无图，1-1张，3-3张 -->
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="article.cover.type > 0">
          <el-row :gutter="10">
            <el-col v-for="(item, idx) in article.cover.type" :key="idx" :xs="8" :sm="6" :md="6" :lg="4">
              <my-cover v-model="article.cover.images[idx]"></my-cover>
            </el-col>
          </el-row>
        </el-form-item>
        <my-channels v-model="article.channel_id" prop="channel_id"></my-channels>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">发布文章</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import MyCover from '@/components/MyCover'
import MyChannels from '@/components/MyChannelsVmodel'
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { addArticle } from '@/api/article'
// 导入样式 import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 1.导入组件
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'AddArticle',
  props: { },
  components: { MyBreadcrumb, quillEditor, MyChannels, MyCover },
  data () {
    return {
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '标题长度为5到30之间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          { min: 20, message: '标题长度最少为20', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'blur' }
        ]
      },
      article: {
        title: 'testtest',
        channel_id: '',
        content: 'testtesttest',
        cover: {
          type: 0,
          images: []
        }
      },
      channels: [], // 频道
      // 富文本配置对象
      editorOption: {
        // 占位配置
        placeholder: '',
        modules: {
          // 配置工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  methods: {
    // 发布文章
    async hAddArticle (isDraft = false) {
      try {
        await addArticle(this.article, isDraft)
        this.$message.success('文章发布成功')
        this.article.title = ''
        this.article.content = ''
      } catch (err) {
        console.log(err)
        this.$message.error('文章发布失败')
      }
    },
    onSubmit (isDraft) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.hAddArticle(isDraft)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
// 覆盖富文本样式(publish-container目的提高选择器优先级)
.publish-container /deep/ .ql-editor{
  height: 300px;
}
.publish-container /deep/ .ql-toolbar.ql-snow{
  padding: 0 8px;
}
</style>
