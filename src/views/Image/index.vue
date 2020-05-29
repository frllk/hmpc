<template>
  <div class='image-container'>
    <el-card>
      <div slot="header" class="clearfix">
        <my-breadcrumb>素材管理</my-breadcrumb>
      </div>
      <!-- 全部 收藏 -->
      <div>
        <el-radio-group @change="hCollectChange" v-model="collect" style="padding-bottom: 20px">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="dialogVisible = true" style="float: right" size="mini" type="success">上传图片素材</el-button>
      </div>
      <!-- 弹出框
      append-to-body：Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
       -->
      <el-dialog
        title="提示"
        :append-to-body="true"
        :visible.sync="dialogVisible">
        <!-- el-upload：
        action： 必选参数，上传的地址
        headers： 设置上传的请求头部
        name： 上传的文件字段名
        show-file-list： 是否显示已上传文件列表
        on-success: 文件上传成功时的钩子
        before-upload: 上传文件之前的钩子，参数为上传的文件，
        若返回 false 或者返回 Promise 且被 reject，则停止上传。
         -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          name="image"
          :headers="headers"
          :show-file-list="false"
          :on-success="hUploadSuccess"
          :before-upload="beforeAvatarUpload">
          <!-- el-image 组件： load 图片加载成功触发 -->
          <el-image v-if="imageUrl" @load='hLoadImgOk' :src="imageUrl" class="avatar"></el-image>
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>

      <!-- 素材列表 -->
      <el-row v-loading="loading" :gutter="10">
        <el-col v-for="(item,idx) in images" :key="item.id" class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style="height: 180px;" :src="item.url"
            fit="cover"
          ></el-image>
          <div v-show="!collect" class="option">
            <span @click='hToggleCollect(item)' :style="{color: item.is_collected ? 'red' : '#fff'}" class="el-icon-star-off"></span>
            <span @click="hDelImage(item.id,idx)" class="el-icon-delete"></span>
          </div>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
      <!-- 分页 -->
      <!-- <el-pagination
        style="margin-top: 10px;"
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :disabled="loading"
        :hide-on-single-page="true"
        @current-change="hPageChange"
        :total="total_count">
      </el-pagination> -->
      <my-pagination
      @current-change="hPageChange"
      :disabled="loading"
      :per_page="per_page"
      :total_count='total_count'></my-pagination>
      <!-- 分页 -->
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import MyPagination from '@/components/MyPagination'
import { getImages, editImage, delImage } from '@/api/image.js'
import { getUser } from '@/utils/storage.js'
export default {
  name: 'ImagesIndex',
  props: { },
  components: { MyBreadcrumb, MyPagination },
  data () {
    return {
      images: [],
      per_page: 12,
      curr_page: 1,
      loading: false,
      total_count: 0,
      dialogVisible: false, // 是否打开dialog
      imageUrl: '', // 图片地址
      headers: {
        Authorization: `Bearer ${getUser().token}`
      },
      collect: false // 是否收藏  true：已收藏  false：全部
    }
  },
  methods: {
    // 加载素材
    async loadImages () {
      try {
        this.loading = true
        const res = await getImages({
          per_page: this.per_page,
          page: this.curr_page,
          collect: this.collect
        })
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
        this.loading = false
      } catch (err) {
        console.log(err)
        this.$message.error('获取素材失败')
        this.loading = false
      }
    },
    hCollectChange () {
      // 切换状态，再次发送请求去获取数据
      this.loadImages()
    },
    // 分页
    hPageChange (currPage) {
      // console.log(currPage)
      // 更新当前页面，然后发送请求
      this.curr_page = currPage
      this.loadImages()
    },
    // 切换收藏状态
    async hToggleCollect (item) {
      try {
        const { id, is_collected } = item
        const res = await editImage(id, { collect: !is_collected })
        item.is_collected = res.data.data.collect
        // console.log(res)
      } catch (err) {
        console.log(err)
        this.$message.error('操作失败')
      }
    },
    // 删除
    hDelImage (id, idx) {
      this.$confirm('你确定要永久删除这条记录吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await delImage(id)
          this.$message.success('删除成功')
          // 删除成功，重新加载数据---更新视图
          // 方法一：整个更新视图
          // this.loadImages()
          // 方法二：只更新当前的数据  在images中删除这一项。  找到这一项在当前数据项images中的位置（索引值），直接删除它。
          this.images.splice(idx, 1)
        } catch (err) {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 文件上传成功触发事件
    hUploadSuccess (res) {
      // console.log(res)
      this.imageUrl = res.data.url
      this.loadImages()
    },
    // 上传文件之前触发的事件
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 图片加载成功触发
    hLoadImgOk () {
      // 关闭对话框,并且重置 imageUrl
      // 给2s时间给用户反应，2s后关闭弹窗
      setTimeout(() => {
        this.dialogVisible = false
        this.imageUrl = ''
      }, 2000)
    }
  },
  computed: { },
  created () {
    this.loadImages()
  },
  mounted () { }
}
</script>

<style scoped lang='less'>
// 在组件内部带scoped的style中写 如果一定要写在组件内部，且加scoped，则可以这样： 在你要修改的类名之前加一个/deep/
.image-container /deep/ .el-card__body {
  padding: 30px;
}
.img_item {
    position: relative;
    box-sizing: border-box;
  }
  .option {
    position: absolute;
    left: 5px;
    right:5px;
    bottom: 5px;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    color: #fff;
    span {
      margin: 0 30px;
      cursor: pointer;
    }
  }
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
</style>
