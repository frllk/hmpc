<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog()">
      <img src="../assets/default.png" />
    </div>
    <!-- 对话框 -->
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px">
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 全部 收藏 -->
          <div>
            <el-radio-group @change="hCollectChange" v-model="collect" style="padding-bottom: 20px">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 素材列表 -->
          <el-row :gutter="10">
            <el-col v-for="item in images" :key="item.id" class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
              <el-image
                style="height: 180px;" :src="item.url"
                fit="cover"
              ></el-image>
            </el-col>
          </el-row>
          <!-- /素材列表 -->
          <!-- 分页 -->
          <my-pagination
          @current-change="hPageChange"
          :per_page="per_page"
          :total_count='total_count'></my-pagination>
          <!-- 分页 -->
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">上传图片内容</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MyPagination from '@/components/MyPagination'
import { getImages } from '@/api/image.js'
export default {
  name: 'MyCover',
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前tabs组件激活的选项卡的name属性的值
      activeName: 'image',
      images: [],
      per_page: 12,
      curr_page: 1,
      total_count: 0,
      collect: false // 是否收藏  true：已收藏  false：全部
    }
  },
  components: { MyPagination },
  methods: {
    // 加载素材
    async loadImages () {
      try {
        const res = await getImages({
          per_page: this.per_page,
          page: this.curr_page,
          collect: this.collect
        })
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
        this.$message.error('获取素材失败')
      }
    },
    // 切换全部&收藏
    hCollectChange () {
      // 设置当前页从第一页开始
      this.curr_page = 1
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
    openDialog () {
      // 打开对话框
      this.dialogVisible = true
      // 发送请求，加载素材
      this.loadImages()
    }
  }
}
</script>

<style scoped lang='less'>
// 图片按钮
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
