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
      </div>
      <!-- 素材列表 -->
      <el-row v-loading="loading" :gutter="10">
        <el-col v-for="item in images" :key="item.id" class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style="height: 180px;" :src="item.url"
            fit="cover"
          ></el-image>
          <div v-show="!collect" class="option">
            <span @click='hToggleCollect(item)' :style="{color: item.is_collected ? 'red' : '#fff'}" class="el-icon-star-off"></span>
            <span @click="hDelImage(item.id)" class="el-icon-delete"></span>
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
        const res = await editImage(item.id, { collect: !item.is_collected })
        item.is_collected = res.data.data.collect
        console.log(res)
      } catch (err) {
        console.log(err)
        this.$message.error('操作失败')
      }
    },
    // 删除
    async hDelImage (id) {
      this.$confirm('你确定要永久删除这条记录吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await delImage(id)
          this.$message.success('删除成功')
          // 删除成功，重新加载数据
          this.loadImages()
        } catch (err) {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
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
