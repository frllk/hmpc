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
            <el-radio-group @change="hCollectChange" v-model="collect"  size="mini" style="padding-bottom: 20px">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 素材列表 -->
          <el-row :gutter="10" class="img_list">
              <!-- 只有当前的image的url与selectedImageUrl相等时，才补充一个selected类
                :class="{类名：值}"
                当值为true就有这个类名，否则就没有
              -->
            <el-col v-for="item in images" :class="{selected: selectImageUrl === item.url}"
            :key="item.id" class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
              <!-- style="height: 100px;"  -->
              <el-image
                @click.native="selectImageUrl = item.url"
                :src="item.url"
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
      // 用它来记录当前用户选中的图片
      // 当用户点击某张图片，则把被点击的图片地址保存在这里
      selectImageUrl: '',
      images: [], // 当前显示的图片列表
      per_page: 12, // 每页显示条数
      curr_page: 1, // 当前页码
      total_count: 0, // 本次查询结果总数
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
    hSelectImage (image) {
      console.log(image.url)
      this.selectImageUrl = image.url
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
// 对话框 上下的空去掉
/deep/ .el-dialog__body {
  padding-bottom: 0px;
  padding-top: 0;
}
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
.selected::after{
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
}
.el-image{
  height: 120px;
}
// 素材列表
.img_list{
  .img_item{
    // 鼠标的形状
    cursor: pointer;
    position: relative;
    // width: 150px;
    // height: 120px;
    // border: 1px dashed #ddd;
    // display: inline-block;
    // margin-right: 15px;
    // img {
    //   width: 100%;
    //   height: 100%;
    //   display: block;
    // }
  }
}
</style>
