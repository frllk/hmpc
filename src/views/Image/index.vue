<template>
  <div class='image-container'>
    <el-card>
      <div slot="header" class="clearfix">
        <my-breadcrumb>素材管理</my-breadcrumb>
      </div>
      <!-- 全部 收藏 -->
      <div>
        <el-radio-group style="padding-bottom: 20px">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col v-for="item in images" :key="item.id" class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            style="height: 180px;" :src="item.url"
            fit="cover"
          ></el-image>
          <div class="option">
            <span :style="{color: item.is_collected ? 'red' : '#fff'}" class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span>
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
import { getImages } from '@/api/image.js'
export default {
  name: 'Images',
  props: { },
  components: { MyBreadcrumb, MyPagination },
  data () {
    return {
      images: [],
      per_page: 10,
      curr_page: 1,
      loading: false,
      total_count: 0
    }
  },
  methods: {
    // 加载素材
    async loadImages () {
      try {
        const res = await getImages({
          per_page: this.per_page,
          page: this.curr_page
        })
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
        this.$message.error('获取素材失败')
      }
    },
    // 分页
    hPageChange (currPage) {
      // console.log(currPage)
      // 更新当前页面，然后发送请求
      this.curr_page = currPage
      this.loadImages()
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
